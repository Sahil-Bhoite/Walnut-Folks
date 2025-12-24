# Transaction Webhook Service

Backend service for processing payment transaction webhooks. Built for the WFG Backend Assessment.

## Requirements
*   Python 3.11+
*   MongoDB Atlas (or local MongoDB)

## Setup

1.  **Create virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

2.  **Environment Variables:**
    Create a `.env` file:
    ```
    MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/?retryWrites=true&w=majority
    DATABASE_NAME=webhook_service
    ```

3.  **Run Server:**
    ```bash
    uvicorn app.main:app --reload
    ```
    Server runs at `http://localhost:8000`.

## API Endpoints

### `POST /v1/webhooks/transactions`
Receives transaction data. Processes in background after a simulated 30s delay.
*   **Idempotent:** Handles duplicate `transaction_id`s by returning 202 without reprocessing.
*   **Security:** Validates payload structure via Pydantic.

**Example:**
```bash
curl -X POST http://localhost:8000/v1/webhooks/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_id": "txn_123",
    "source_account": "acc_A",
    "destination_account": "acc_B",
    "amount": 100,
    "currency": "USD"
  }'
```

### `GET /v1/transactions/{transaction_id}`
Check status of a transaction (`PROCESSING` vs `PROCESSED`).

### `GET /`
Health check. Returns service status.

## Implementation Notes
*   **FastAPI** used for async handling and background tasks.
*   **Motor** driver for non-blocking MongoDB I/O.
*   **Idempotency** is enforced via a unique index on `transaction_id` in the database.
