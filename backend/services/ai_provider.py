import os
import json
import httpx
from typing import List, Dict, Any, Optional
from backend.core.config import settings
from backend.core.security import scrub_sensitive_data, logger

SYSTEM_PROMPT = """You are SaathiShield AI (साथीशील्ड AI) — an Indian citizen digital safety and cybersecurity educator developed for the Hackyard x Adaption Dataset Challenge 2026.

YOUR MISSION:
Help Indian citizens, first-time UPI users, rural/semi-urban citizens, and senior citizens understand digital payment safety, recognize social engineering, protect their devices, and know official emergency procedures.

STRICT OPERATIONAL RULES:
1. CITIZEN SAFETY COMES FIRST: Prioritize safety, caution, and clear next steps over conversational fluff.
2. NEVER REQUEST SENSITIVE CREDENTIALS: Never ask the user to share OTPs, UPI PINs, passwords, CVVs, or full account numbers. If a user mentions having shared them, provide containment steps immediately.
3. NEVER SUGGEST RISKY ACTIONS: Never tell users to click suspicious links, download unknown APK files, or test QR codes.
4. ZERO FALSE GUARANTEES: Never guarantee that stolen money can be recovered. Recovery depends on rapid bank and 1930 helpline action during the 'Golden Hours'.
5. NO OFFICIAL IMPERSONATION: Never claim to be a police officer, CBI officer, RBI official, or bank employee. State that you are an educational citizen safety assistant.
6. NO FABRICATED CITATIONS: Ground safety advice strictly in verified Indian authorities:
   - Reserve Bank of India (RBI)
   - National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in)
   - Indian Cyber Crime Coordination Centre (I4C / CyberDost)
   - National Payments Corporation of India (NPCI)
   - Department of Telecommunications Sanchar Saathi (Chakshu)
7. MULTILINGUAL FLUENCY:
   - If user asks in Hindi (Devanagari), respond in natural, respectful Hindi.
   - If user asks in Hinglish (Roman Hindi), respond in natural conversational Hinglish.
   - If user asks in English, respond in clear, accessible English.
8. GENUINE OPEN-ENDED REASONING:
   - Answer open-ended cybersecurity questions directly and thoughtfully (e.g. why scammers create urgency, how to teach parents, differences between UPI ID and UPI PIN, normal call risks).
   - If verified reference knowledge is provided, incorporate its factual principles accurately.
   - If a claim cannot be verified from authoritative sources, admit uncertainty honestly and direct the user to official channels.
9. TONE: Calm, reassuring, supportive, educational. Never blame victims or cause unnecessary panic.
"""

def build_gemini_contents(
    prompt: str,
    conversation_history: List[Dict[str, str]]
) -> List[Dict[str, Any]]:
    """
    Builds clean, alternating user-model conversation turns for Gemini.
    Ensures no consecutive same-role turns and no duplicate latest user message.
    """
    contents = []
    clean_prompt = scrub_sensitive_data(prompt.strip())

    # Filter history: exclude if last item is already the current prompt
    valid_history = []
    for h in conversation_history[-8:]:
        text = scrub_sensitive_data(h.get("text", "").strip())
        sender = h.get("sender", "user")
        if text:
            valid_history.append((sender, text))

    # Remove trailing user message in history if identical to prompt
    if valid_history and valid_history[-1][0] == "user" and valid_history[-1][1] == clean_prompt:
        valid_history.pop()

    # Enforce strictly alternating user -> model turns
    last_role = None
    for sender, text in valid_history:
        role = "user" if sender == "user" else "model"
        if role == last_role:
            # Merge with previous turn if same role to satisfy Gemini schema
            contents[-1]["parts"][0]["text"] += f"\n\n{text}"
        else:
            contents.append({
                "role": role,
                "parts": [{"text": text}]
            })
            last_role = role

    # Ensure the sequence starts with user if empty or leading model
    if contents and contents[0]["role"] == "model":
        contents.pop(0)

    # Append current user prompt
    if contents and contents[-1]["role"] == "user":
        contents[-1]["parts"][0]["text"] += f"\n\n{clean_prompt}"
    else:
        contents.append({
            "role": "user",
            "parts": [{"text": clean_prompt}]
        })

    return contents

async def call_gemini(
    prompt: str,
    conversation_history: List[Dict[str, str]],
    context_chunks: List[str]
) -> Optional[str]:
    """
    Calls Google Gemini API via REST endpoint with grounding context and clean multi-turn history.
    """
    if not settings.GEMINI_API_KEY:
        return None

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{settings.GEMINI_MODEL}:generateContent?key={settings.GEMINI_API_KEY}"

    grounding_text = ""
    if context_chunks:
        grounding_text = "\n\nVERIFIED CITIZEN GUIDELINES CONTEXT:\n" + "\n---\n".join(context_chunks)

    full_system = f"{SYSTEM_PROMPT}{grounding_text}"
    contents = build_gemini_contents(prompt, conversation_history)

    payload = {
        "system_instruction": {"parts": [{"text": full_system}]},
        "contents": contents,
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 850
        }
    }

    try:
        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT_SECONDS) as client:
            res = await client.post(url, json=payload)
            if res.status_code == 200:
                data = res.json()
                candidates = data.get("candidates", [])
                if candidates and "content" in candidates[0]:
                    parts = candidates[0]["content"].get("parts", [])
                    if parts and "text" in parts[0]:
                        return parts[0]["text"].strip()
            else:
                logger.warning(f"Gemini API returned status {res.status_code}: {res.text[:300]}")
    except Exception as e:
        logger.error(f"Gemini API error: {e}")

    return None

async def call_openai(
    prompt: str,
    conversation_history: List[Dict[str, str]],
    context_chunks: List[str]
) -> Optional[str]:
    """
    Calls OpenAI chat completions API with grounding context and conversation history.
    """
    if not settings.OPENAI_API_KEY:
        return None

    url = f"{settings.OPENAI_BASE_URL.rstrip('/')}/chat/completions"
    headers = {
        "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    grounding_text = ""
    if context_chunks:
        grounding_text = "\n\nVERIFIED CITIZEN GUIDELINES CONTEXT:\n" + "\n---\n".join(context_chunks)

    system_content = f"{SYSTEM_PROMPT}{grounding_text}"
    clean_prompt = scrub_sensitive_data(prompt.strip())

    messages = [{"role": "system", "content": system_content}]

    # Filter history
    for h in conversation_history[-8:]:
        text = scrub_sensitive_data(h.get("text", "").strip())
        role = "user" if h.get("sender") == "user" else "assistant"
        if text and text != clean_prompt:
            messages.append({"role": role, "content": text})

    messages.append({"role": "user", "content": clean_prompt})

    payload = {
        "model": settings.OPENAI_MODEL,
        "messages": messages,
        "temperature": 0.3,
        "max_tokens": 850
    }

    try:
        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT_SECONDS) as client:
            res = await client.post(url, headers=headers, json=payload)
            if res.status_code == 200:
                data = res.json()
                choices = data.get("choices", [])
                if choices and "message" in choices[0]:
                    return choices[0]["message"]["content"].strip()
            else:
                logger.warning(f"OpenAI API returned status {res.status_code}: {res.text[:300]}")
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")

    return None

def synthesize_retrieval_response(
    query: str,
    lang: str,
    retrieved_items: List[Dict[str, Any]],
    conversation_history: List[Dict[str, str]] = None
) -> Tuple[str, float]:
    """
    Retrieval synthesis used when external AI APIs are not configured or offline.
    Returns (answer_text, confidence_score).
    If no relevant match is found in the verified knowledge base, honestly states that
    a specific record is not found in offline mode instead of inventing a fabricated answer.
    """
    top_score = retrieved_items[0].get("relevance_score", 0.0) if retrieved_items else 0.0

    # Case 1: High/Moderate relevance match found in verified dataset
    if retrieved_items and top_score >= 0.22:
        primary = retrieved_items[0]
        completion = primary.get("completion") or primary.get("base_completion") or ""
        confidence = min(0.92, max(0.50, round(top_score, 2)))
        return completion.strip(), confidence

    # Case 2: Out of domain or low relevance match in retrieval-only mode
    if lang == "hi":
        msg = (
            "📖 **सीमित ज्ञानकोश मोड (Limited Knowledge Mode)**\n\n"
            "वर्तमान में AI सहायक ऑफलाइन/सीमित ज्ञानकोश मोड में कार्य कर रहा है। आपके द्वारा पूछे गए विशिष्ट प्रश्न के लिए हमारे सत्यापित डेटाबेस में कोई सीधा मिलान नहीं मिला।\n\n"
            "**सुरक्षित सत्यापन दिशा-निर्देश:**\n"
            "1. किसी भी बैंक या सेवा संबंधी दावे को सीधे अपने बैंक की आधिकारिक मोबाइल ऐप या शाखा से सत्यापित करें।\n"
            "2. किसी भी अज्ञात कॉलर या संदेश के साथ OTP, UPI PIN या व्यक्तिगत पहचान विवरण कभी साझा न करें।\n"
            "3. यदि आपको किसी वित्तीय धोखाधड़ी का संदेह है, तो तुरंत राष्ट्रीय साइबर हेल्पलाइन **1930** पर कॉल करें या **cybercrime.gov.in** पर शिकायत दर्ज करें।"
        )
    elif lang == "hi-en":
        msg = (
            "📖 **Limited Knowledge Mode (Offline Retrieval)**\n\n"
            "Currently, SaathiShield is running in limited retrieval mode without a connected live AI provider. We could not find a verified knowledge base match for your specific query.\n\n"
            "**Recommended Verification Steps:**\n"
            "1. Verify any banking claims directly via your bank's official mobile application or physical branch.\n"
            "2. Never disclose OTPs, UPI PINs, or credentials to any unverified caller.\n"
            "3. For suspected fraud, call the National Cyber Helpline **1930** immediately or report at **cybercrime.gov.in**."
        )
    else:
        msg = (
            "📖 **Limited Knowledge Mode (Offline Retrieval)**\n\n"
            "The assistant is currently operating in limited retrieval mode without an active generative AI provider. No high-confidence verified knowledge match was identified for your specific query.\n\n"
            "**Core Safety Protocol:**\n"
            "1. Independently authenticate all claims through your financial institution's verified mobile app or branch.\n"
            "2. Never disclose One-Time Passwords (OTP), UPI PINs, or card CVVs under any circumstance.\n"
            "3. If you suspect an active fraud attempt, immediately contact the National Cybercrime Helpline at **1930** or lodge a report at **https://cybercrime.gov.in**."
        )

    return msg, round(max(0.20, top_score), 2)
