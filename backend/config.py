import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
PORT: int = int(os.getenv("PORT", 5000))
