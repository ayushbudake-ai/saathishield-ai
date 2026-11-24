from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

from backend.core.config import settings
from backend.core.rate_limiter import rate_limiter
from backend.core.security import scrub_sensitive_data, logger
from backend.services.chat_orchestrator import process_chat_message
from backend.services.retriever import retriever

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Intelligent Multilingual Cybersecurity and Digital Safety Assistant API"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request & Response Schemas
class HistoryItem(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=settings.MAX_REQUEST_CHARS)
    conversation_id: str = Field(default="default-session")
    conversation_history: Optional[List[HistoryItem]] = Field(default_factory=list)
    language: Optional[str] = Field(default="hi")

class SourceItem(BaseModel):
    name: str
    url: str
    authority: Optional[str] = None

class ChatResponse(BaseModel):
    answer: str
    detected_language: str
    detected_intent: str
    risk_level: str
    response_mode: str
    recommended_actions: List[str]
    sources: List[SourceItem]
    confidence: float
    suggested_followups: List[str]

@app.get("/api/health")
async def health_check():
    """Health check reporting active AI provider and knowledge base statistics."""
    return {
        "status": "healthy",
        "version": settings.VERSION,
        "ai_provider": settings.AI_PROVIDER,
        "knowledge_items_loaded": len(retriever.knowledge_items),
        "official_sources_registered": len(retriever.sources),
        "rate_limit_per_minute": settings.RATE_LIMIT_PER_MINUTE
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, req: Request):
    """
    Primary multilingual citizen safety conversational endpoint.
    Processes queries through intent detection, emergency priority triage,
    grounded knowledge retrieval, and AI generation.
    """
    client_ip = req.client.host if req.client else "unknown-client"
    
    # 1. Rate Limiting Check
    rate_limiter.check(client_ip)

    # 2. Scrub sensitive credentials from prompt
    clean_message = scrub_sensitive_data(request.message.strip())
    if not clean_message:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message cannot be empty."
        )

    # 3. Format history
    history = [
        {"sender": h.sender, "text": scrub_sensitive_data(h.text)}
        for h in (request.conversation_history or [])
    ]

    try:
        result = await process_chat_message(
            message=clean_message,
            conversation_id=request.conversation_id,
            conversation_history=history,
            preferred_lang=request.language or "hi"
        )
        return result
    except Exception as e:
        logger.error(f"Error handling chat request: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate response. Please try again."
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
