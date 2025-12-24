import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# MongoDB Configuration
MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "webhook_service")

# Processing Configuration
PROCESSING_DELAY_SECONDS = 30  # Simulated processing delay
