import os
from typing import List
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "SaathiShield AI Backend"
    VERSION: str = "2.0.0"
    API_PREFIX: str = "/api"

    # AI Provider configuration
    # Supported: "gemini", "openai", "none" (retrieval-enhanced fallback)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_BASE_URL: str = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
    
    # Preferred provider resolution
    DEFAULT_PROVIDER: str = os.getenv("AI_PROVIDER", "")
    if not DEFAULT_PROVIDER:
        if GEMINI_API_KEY:
            DEFAULT_PROVIDER = "gemini"
        elif OPENAI_API_KEY:
            DEFAULT_PROVIDER = "openai"
        else:
            DEFAULT_PROVIDER = "none"

    AI_PROVIDER: str = DEFAULT_PROVIDER
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

    # Security & Rate Limiting
    MAX_REQUEST_CHARS: int = 4000
    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
    REQUEST_TIMEOUT_SECONDS: float = float(os.getenv("REQUEST_TIMEOUT_SECONDS", "15.0"))
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "http://localhost:3000",
        "*"
    ]

settings = Settings()
