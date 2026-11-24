import re
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("SaathiShield")

# Regexes for scrubbing sensitive financial data
CARD_REGEX = re.compile(r'\b(?:\d[ -]*?){13,16}\b')
OTP_REGEX = re.compile(r'\b(?:otp|pin|cvv|code|passcode)\s*(?:is|was|h|hai|tha|to)?\s*[:=-]?\s*(\d{3,8})\b', re.IGNORECASE)
REVERSE_OTP_REGEX = re.compile(r'\b(\d{3,8})\s*(?:is|was|hai|mera)?\s*(?:otp|pin|cvv|code)\b', re.IGNORECASE)
ACCOUNT_REGEX = re.compile(r'\b(?:\d{9,18})\b')

def scrub_sensitive_data(text: str) -> str:
    """
    Scrubs credit card numbers, OTPs, CVVs and bank account numbers from text
    prior to logging, retrieval queries, or LLM payload generation.
    """
    if not text:
        return ""
    
    # Redact explicit OTP / PIN labels with values
    scrubbed = OTP_REGEX.sub(r'[REDACTED_CREDENTIAL]', text)
    scrubbed = REVERSE_OTP_REGEX.sub(r'[REDACTED_CREDENTIAL]', scrubbed)
    
    # Redact 16-digit card patterns
    scrubbed = CARD_REGEX.sub('[CARD_NUMBER_REDACTED]', scrubbed)
    
    # Redact raw 4-6 digit standalone numbers when message context mentions OTP/PIN
    if re.search(r'\b(?:otp|pin|cvv)\b', scrubbed, re.IGNORECASE):
        scrubbed = re.sub(r'\b\d{4,6}\b', '[REDACTED_OTP]', scrubbed)
    
    return scrubbed

def log_safe_interaction(conversation_id: str, intent: str, lang: str, mode: str, char_len: int):
    """
    Logs metadata about user requests without storing message text or credentials.
    """
    logger.info(
        f"Interaction conv_id={conversation_id[:8]}... intent={intent} lang={lang} mode={mode} chars={char_len}"
    )
