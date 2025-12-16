import os
from dotenv import load_dotenv

load_dotenv()

FLASK_ENV = os.getenv("FLASK_ENV", "development")
FLASK_PORT = int(os.getenv("FLASK_PORT", 5000))

BINANCE_SYMBOLS = [
    s.strip().upper()
    for s in os.getenv("BINANCE_SYMBOLS", "").split(",")
    if s.strip()
]

REDIS_URL = os.getenv("REDIS_URL")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")