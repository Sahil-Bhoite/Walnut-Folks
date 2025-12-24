from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class TransactionStatus(str, Enum):
    """Transaction processing status"""
    PROCESSING = "PROCESSING"
    PROCESSED = "PROCESSED"


class TransactionWebhook(BaseModel):
    """Request model for incoming webhook"""
    transaction_id: str = Field(..., description="Unique transaction identifier")
    source_account: str = Field(..., description="Source account ID")
    destination_account: str = Field(..., description="Destination account ID")
    amount: float = Field(..., description="Transaction amount")
    currency: str = Field(..., description="Currency code (e.g., INR, USD)")


class TransactionResponse(BaseModel):
    """Response model for transaction query"""
    transaction_id: str
    source_account: str
    destination_account: str
    amount: float
    currency: str
    status: TransactionStatus
    created_at: datetime
    processed_at: Optional[datetime] = None


class HealthResponse(BaseModel):
    """Response model for health check"""
    status: str = "HEALTHY"
    current_time: datetime


class WebhookAcknowledgement(BaseModel):
    """Response model for webhook acknowledgement"""
    message: str = "Webhook received"
    transaction_id: str
