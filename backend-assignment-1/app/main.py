from fastapi import FastAPI, BackgroundTasks, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from app.database import connect_to_database, close_database_connection
from app.models import (
    TransactionWebhook,
    TransactionResponse,
    HealthResponse,
    WebhookAcknowledgement
)
from app.services import create_transaction, process_transaction, get_transaction


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle - connect/disconnect from database"""
    # Startup
    await connect_to_database()
    yield
    # Shutdown
    await close_database_connection()


# Initialize FastAPI app
app = FastAPI(
    title="Transaction Webhook Service",
    description="A service that receives and processes transaction webhooks",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== ENDPOINTS ====================

@app.get("/", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint.
    Returns service status and current time.
    """
    return HealthResponse(
        status="HEALTHY",
        current_time=datetime.now(timezone.utc)
    )


@app.post(
    "/v1/webhooks/transactions",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=WebhookAcknowledgement
)
async def receive_webhook(
    webhook: TransactionWebhook,
    background_tasks: BackgroundTasks
):
    """
    Receive transaction webhook.
    
    - Responds immediately with 202 Accepted
    - Processes transaction in background (30-second delay)
    - Handles duplicate webhooks gracefully (idempotency)
    """
    # Try to create transaction (returns False if duplicate)
    is_new = await create_transaction(webhook)
    
    if is_new:
        # Only process if this is a new transaction
        background_tasks.add_task(process_transaction, webhook.transaction_id)
    
    # Always return 202 Accepted (even for duplicates)
    return WebhookAcknowledgement(
        message="Webhook received",
        transaction_id=webhook.transaction_id
    )


@app.get(
    "/v1/transactions/{transaction_id}",
    response_model=TransactionResponse
)
async def get_transaction_status(transaction_id: str):
    """
    Get transaction status by ID.
    
    Returns transaction details including:
    - Processing status (PROCESSING or PROCESSED)
    - Created and processed timestamps
    """
    transaction = await get_transaction(transaction_id)
    
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Transaction {transaction_id} not found"
        )
    
    return transaction


# ==================== MAIN ====================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
