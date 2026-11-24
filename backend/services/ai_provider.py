import os
import json
import httpx
from typing import List, Dict, Any, Optional
from backend.core.config import settings
from backend.core.security import scrub_sensitive_data, logger

SYSTEM_PROMPT = """You are SaathiShield AI (साथीशील्ड AI) — an authentic Indian citizen digital safety and cybersecurity educator developed for the Hackyard x Adaption Dataset Challenge 2026.

YOUR MISSION:
Help Indian citizens, first-time UPI users, rural/semi-urban users, and senior citizens understand digital payment safety, recognize scams (UPI Collect fraud, fake electricity bills, digital arrest, malicious APKs, phishing), and know exact official emergency steps.

STRICT OPERATIONAL RULES:
1. CITIZEN SAFETY COMES FIRST: Prioritize safety, caution, and clear next steps over conversational fluff.
2. NEVER REQUEST SENSITIVE DATA: Never ask the user to share OTPs, UPI PINs, passwords, CVVs, or bank account numbers. If user mentions sharing them, provide containment steps immediately.
3. NEVER SUGGEST RISKY ACTIONS: Never tell users to click suspicious links, download unknown APK files, or test QR codes.
4. ZERO FALSE GUARANTEES: Never guarantee that stolen money can be recovered. Recovery depends on timely bank and 1930 action.
5. NO IMPERSONATION: Never claim to be a police officer, CBI, RBI, or bank official. State that you are an educational safety assistant.
6. NO FABRICATED CITATIONS: Ground safety advice strictly in verified Indian authorities:
   - Reserve Bank of India (RBI)
   - National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in)
   - Indian Cyber Crime Coordination Centre (I4C / CyberDost)
   - National Payments Corporation of India (NPCI)
   - Sanchar Saathi (Chakshu)
7. MULTILINGUAL FLUENCY:
   - If user asks in Hindi (Devanagari), respond in clear, natural Hindi.
   - If user asks in Hinglish (Roman Hindi), respond in natural conversational Hinglish.
   - If user asks in English, respond in professional, accessible English.
8. STRUCTURED RESPONSE FORMAT:
   - Direct, reassuring answer in the first sentence.
   - Simple explanation of the scam mechanics.
   - Numbered immediate steps to take.
   - Crucial things to avoid.
   - Relevant official authority/helpline reference.
9. TONE: Calm, reassuring, supportive, factual. Never blame the victim or cause unnecessary panic.
"""

async def call_gemini(
    prompt: str,
    conversation_history: List[Dict[str, str]],
    context_chunks: List[str]
) -> Optional[str]:
    """
    Calls Google Gemini API via official REST endpoint using httpx.
    """
    if not settings.GEMINI_API_KEY:
        return None

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{settings.GEMINI_MODEL}:generateContent?key={settings.GEMINI_API_KEY}"

    contents = []

    # Insert verified knowledge context
    grounding_text = "\n\n".join([f"VERIFIED SOURCE KNOWLEDGE:\n{c}" for c in context_chunks])
    full_system = f"{SYSTEM_PROMPT}\n\n{grounding_text}"

    # Add historical context turns (up to last 4)
    for h in conversation_history[-4:]:
        role = "user" if h.get("sender") == "user" else "model"
        contents.append({
            "role": role,
            "parts": [{"text": scrub_sensitive_data(h.get("text", ""))}]
        })

    # Current user turn
    contents.append({
        "role": "user",
        "parts": [{"text": scrub_sensitive_data(prompt)}]
    })

    payload = {
        "system_instruction": {"parts": [{"text": full_system}]},
        "contents": contents,
        "generationConfig": {
            "temperature": 0.2,
            "maxOutputTokens": 800
        }
    }

    try:
        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT_SECONDS) as client:
            res = await client.post(url, json=payload)
            if res.status_code == 200:
                data = res.json()
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                return text.strip()
            else:
                logger.warning(f"Gemini API returned status {res.status_code}: {res.text}")
    except Exception as e:
        logger.error(f"Gemini API error: {e}")

    return None

async def call_openai(
    prompt: str,
    conversation_history: List[Dict[str, str]],
    context_chunks: List[str]
) -> Optional[str]:
    """
    Calls OpenAI or any OpenAI-compatible API endpoint.
    """
    if not settings.OPENAI_API_KEY:
        return None

    url = f"{settings.OPENAI_BASE_URL.rstrip('/')}/chat/completions"
    headers = {
        "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    grounding_text = "\n\n".join([f"VERIFIED SOURCE KNOWLEDGE:\n{c}" for c in context_chunks])
    system_content = f"{SYSTEM_PROMPT}\n\n{grounding_text}"

    messages = [{"role": "system", "content": system_content}]

    for h in conversation_history[-4:]:
        role = "user" if h.get("sender") == "user" else "assistant"
        messages.append({"role": role, "content": scrub_sensitive_data(h.get("text", ""))})

    messages.append({"role": "user", "content": scrub_sensitive_data(prompt)})

    payload = {
        "model": settings.OPENAI_MODEL,
        "messages": messages,
        "temperature": 0.2,
        "max_tokens": 800
    }

    try:
        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT_SECONDS) as client:
            res = await client.post(url, headers=headers, json=payload)
            if res.status_code == 200:
                data = res.json()
                text = data["choices"][0]["message"]["content"]
                return text.strip()
            else:
                logger.warning(f"OpenAI API returned status {res.status_code}: {res.text}")
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")

    return None

def synthesize_retrieval_response(
    query: str,
    lang: str,
    retrieved_items: List[Dict[str, Any]],
    conversation_history: List[Dict[str, str]] = None
) -> str:
    """
    High-fidelity retrieval synthesis used when external AI APIs are not configured or offline.
    Directly extracts and formats verified instruction pairs from the Adaption-enhanced dataset.
    """
    if not retrieved_items:
        if lang == "hi":
            return (
                "🛡️ **साथीशील्ड सुरक्षा विश्लेषण**\n\n"
                "आपकी सुरक्षा के लिए मुख्य नियम:\n"
                "1. किसी भी अनजान व्यक्ति के साथ OTP, UPI PIN या नेटबैंकिंग पासवर्ड साझा न करें।\n"
                "2. किसी भी समस्या के समाधान के लिए केवल आधिकारिक प्रमाणित ऐप या बैंक की नजदीकी शाखा से संपर्क करें।\n"
                "3. किसी भी वित्तीय धोखाधड़ी की स्थिति में तुरंत **1930** राष्ट्रीय हेल्पलाइन पर संपर्क करें।"
            )
        elif lang == "hi-en":
            return (
                "🛡️ **SaathiShield Safety Analysis**\n\n"
                "Digital safety ke essential rules:\n"
                "1. Kisi bhi caller ke sath OTP, UPI PIN ya passwords share na karein.\n"
                "2. Hamesha official banking application ya bank branch se verify karein.\n"
                "3. Financial fraud emergency me foran **1930** helpline dial karein."
            )
        else:
            return (
                "🛡️ **SaathiShield Safety Analysis**\n\n"
                "Core digital hygiene principles:\n"
                "1. Never share OTPs, UPI PINs, or banking credentials with anyone.\n"
                "2. Verify service notifications directly through authorized bank channels.\n"
                "3. In active fraud situations, immediately contact the National Cyber Helpline **1930**."
            )

    # Use the best retrieved item
    primary = retrieved_items[0]
    completion = primary.get("completion") or primary.get("base_completion") or ""
    return completion.strip()
