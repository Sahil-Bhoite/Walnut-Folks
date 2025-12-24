from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError
from app.config import MONGODB_URI, DATABASE_NAME

# MongoDB client instance
client = None
database = None


async def connect_to_database():
    """Connect to MongoDB Atlas"""
    global client, database
    
    client = AsyncIOMotorClient(MONGODB_URI)
    database = client[DATABASE_NAME]
    
    # Create unique index on transaction_id for idempotency
    await database.transactions.create_index("transaction_id", unique=True)
    
    print(f"Connected to MongoDB: {DATABASE_NAME}")


async def close_database_connection():
    """Close MongoDB connection"""
    global client
    
    if client:
        client.close()
        print("MongoDB connection closed")


def get_database():
    """Get database instance"""
    return database


def get_transactions_collection():
    """Get transactions collection"""
    return database.transactions
