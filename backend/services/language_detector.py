import re

# Devanagari Unicode block: U+0900 to U+097F
DEVANAGARI_REGEX = re.compile(r'[\u0900-\u097F]')

# Common Hinglish tokens and colloquial phonetics
HINGLISH_KEYWORDS = {
    "kya", "kyu", "kaise", "kisko", "kaha", "kab", "kuch", "nahi", "nahin", "mat",
    "paisa", "paise", "kat", "gaya", "gye", "debit", "credit", "aaya", "aayi", "bheja",
    "bhejo", "bheje", "daalo", "daal", "diya", "de", "diye", "bolo", "bol", "raha",
    "rahi", "hoga", "hogi", "karein", "karu", "kare", "karna", "padega", "padta",
    "bhai", "sir", "meri", "mera", "mere", "aapka", "aapke", "apna", "apne", "unka",
    "unhone", "unhe", "call", "msg", "sms", "link", "f फर्जी", "scam", "fraud", "yahan",
    "wahan", "turant", "foran", "bachu", "bachein", "batao", "bataya", "rakhein"
}

def detect_language(text: str, fallback_lang: str = "hi") -> str:
    """
    Detects language of citizen query:
    - 'hi' (Hindi in Devanagari)
    - 'hi-en' (Hinglish in natural Roman Hindi)
    - 'en' (English)
    """
    if not text or not text.strip():
        return fallback_lang

    text_clean = text.strip()
    
    # Check Devanagari character count
    devanagari_chars = len(DEVANAGARI_REGEX.findall(text_clean))
    total_alpha = len([c for c in text_clean if c.isalpha()])

    if total_alpha > 0 and (devanagari_chars / total_alpha) > 0.25:
        return "hi"

    # Analyze Romanized words for Hinglish markers
    words = re.findall(r'\b[a-zA-Z]+\b', text_clean.lower())
    if not words:
        return fallback_lang

    hinglish_matches = sum(1 for w in words if w in HINGLISH_KEYWORDS)
    hinglish_ratio = hinglish_matches / len(words)

    if hinglish_matches >= 2 or hinglish_ratio >= 0.15:
        return "hi-en"

    # Default to English if Latin alphabet and low Hinglish density
    return "en"
