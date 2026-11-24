import time
from collections import defaultdict
from fastapi import HTTPException, status
from backend.core.config import settings

class RateLimiter:
    def __init__(self, limit_per_minute: int = 60):
        self.limit = limit_per_minute
        self.requests = defaultdict(list)

    def check(self, client_id: str):
        now = time.time()
        window_start = now - 60.0

        # Filter timestamps within current 60s window
        self.requests[client_id] = [t for t in self.requests[client_id] if t > window_start]

        if len(self.requests[client_id]) >= self.limit:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many requests. Please wait a minute before sending another safety question."
            )

        self.requests[client_id].append(now)

rate_limiter = RateLimiter(settings.RATE_LIMIT_PER_MINUTE)
