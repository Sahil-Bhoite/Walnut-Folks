import asyncio
from datetime import datetime, timezone
from typing import Optional
from pymongo.errors import DuplicateKeyError

from app.database import get_transactions_collection
from app.models import TransactionWebhook, TransactionStatus, TransactionResponse
from app.config import PROCESSING_DELAY_SECONDS


async def create_transaction(webhook: TransactionWebhook) -> bool:
    """
    Create a new transaction in the database.
    Returns True if created, False if already exists (idempotency).
    """
    collection = get_transactions_collection()
    
    transaction_doc = {
        "transaction_id": webhook.transaction_id,
        "source_account": webhook.source_account,
        "destination_account": webhook.destination_account,
        "amount": webhook.amount,
        "currency": webhook.currency,
        "status": TransactionStatus.PROCESSING.value,
        "created_at": datetime.now(timezone.utc),
        "processed_at": None
    }
    
    try:
        await collection.insert_one(transaction_doc)
        return True  # New transaction created
    except DuplicateKeyError:
        return False  # Transaction already exists (idempotency)


async def process_transaction(transaction_id: str):
    """
    Background task to process a transaction.
    Simulates external API call with 30-second delay.
    """
    # Simulate external API processing time
    await asyncio.sleep(PROCESSING_DELAY_SECONDS)
    
    # Update transaction status to PROCESSED
    collection = get_transactions_collection()
    await collection.update_one(
        {"transaction_id": transaction_id},
        {
            "$set": {
                "status": TransactionStatus.PROCESSED.value,
                "processed_at": datetime.now(timezone.utc)
            }
        }
    )
    
    print(f"Transaction {transaction_id} processed successfully")


async def get_transaction(transaction_id: str) -> Optional[TransactionResponse]:
    """
    Retrieve a transaction by its ID.
    Returns None if not found.
    """
    collection = get_transactions_collection()
    
    doc = await collection.find_one({"transaction_id": transaction_id})
    
    if not doc:
        return None
    
    return TransactionResponse(
        transaction_id=doc["transaction_id"],
        source_account=doc["source_account"],
        destination_account=doc["destination_account"],
        amount=doc["amount"],
        currency=doc["currency"],
        status=doc["status"],
        created_at=doc["created_at"],
        processed_at=doc.get("processed_at")
    )
