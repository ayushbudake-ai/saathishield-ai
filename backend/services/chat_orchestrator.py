from typing import List, Dict, Any
from backend.services.language_detector import detect_language
from backend.services.intent_detector import detect_intent
from backend.services.emergency_handler import format_emergency_response
from backend.services.retriever import retriever
from backend.services.ai_provider import call_gemini, call_openai, synthesize_retrieval_response
from backend.core.config import settings
from backend.core.security import log_safe_interaction

def generate_followup_suggestions(intent: str, lang: str) -> List[str]:
    """Generates context-aware follow-up suggestion chips."""
    if lang == "hi":
        if "remote_access" in intent or "apk" in intent or "device" in intent:
            return ["क्या अनजान APK से फोन हैक हो सकता है?", "AnyDesk ऐप से पैसे कैसे चोरी होते हैं?"]
        elif "upi" in intent or "pin" in intent:
            return ["क्या QR कोड स्कैन करने से पैसे कटते हैं?", "गलती से भेजे पैसे कैसे वापस लाएं?"]
        elif "phishing" in intent or "kyc" in intent:
            return ["असली बैंक SMS की पहचान कैसे करें?", "बिजली बिल फ्रॉड की शिकायत कहाँ करें?"]
        elif "digital_arrest" in intent:
            return ["क्या पुलिस वीडियो कॉल पर अरेस्ट कर सकती है?", "नकली कोर्ट नोटिस की पहचान कैसे करें?"]
        else:
            return ["साइबर हेल्पलाइन 1930 कैसे काम करती है?", "Aadhaar बायोमेट्रिक लॉक कैसे करें?"]
    elif lang == "hi-en":
        if "remote_access" in intent or "apk" in intent or "device" in intent:
            return ["Can APK malware read bank OTPs?", "What to do if already installed?"]
        elif "upi" in intent or "pin" in intent:
            return ["Can money be deducted just by QR scan?", "What is wrong transfer scam?"]
        elif "phishing" in intent or "kyc" in intent:
            return ["How to identify fake bank SMS headers?", "How to report on Chakshu portal?"]
        elif "digital_arrest" in intent:
            return ["Can police arrest on Skype video call?", "What is an RBI verification account?"]
        else:
            return ["How does 1930 helpline freeze money?", "How to lock Aadhaar biometric?"]
    else:
        if "remote_access" in intent or "apk" in intent or "device" in intent:
            return ["How do APK trojans intercept SMS OTPs?", "How to audit Android Device Admin permissions?"]
        elif "upi" in intent or "pin" in intent:
            return ["Do I ever need a PIN to receive funds?", "How do UPI collect requests work?"]
        elif "phishing" in intent or "kyc" in intent:
            return ["What are TRAI approved SMS headers?", "How to report phishing on Chakshu?"]
        elif "digital_arrest" in intent:
            return ["Can Indian police arrest via Skype call?", "What is the legal arrest procedure?"]
        else:
            return ["What are the 1930 golden hours?", "How to invoke RBI zero liability rule?"]

async def process_chat_message(
    message: str,
    conversation_id: str,
    conversation_history: List[Dict[str, str]] = None,
    preferred_lang: str = "hi"
) -> Dict[str, Any]:
    """
    Core orchestrator processing citizen messages end-to-end.
    """
    conversation_history = conversation_history or []

    # 1. Detect language
    detected_lang = detect_language(message, fallback_lang=preferred_lang)

    # 2. Detect intent & risk level
    detected_intent, risk_level = detect_intent(message, conversation_history)

    # 3. Emergency Fast-Path Check
    if risk_level == "emergency":
        resp = format_emergency_response(detected_intent, detected_lang)
        log_safe_interaction(conversation_id, detected_intent, detected_lang, "emergency", len(message))
        return resp

    # 4. Retrieve Grounded Knowledge
    retrieved_items = retriever.retrieve(message, detected_intent=detected_intent, top_k=2)

    sources = []
    seen_urls = set()
    for item in retrieved_items:
        src = item.get("source", {})
        url = src.get("url", "")
        if url and url not in seen_urls:
            seen_urls.add(url)
            sources.append(src)

    if not sources:
        sources.append({
            "name": "Reserve Bank of India Consumer Awareness",
            "url": "https://www.rbi.org.in/",
            "authority": "Reserve Bank of India"
        })

    # 5. AI Response Generation
    answer_text = None
    response_mode = "retrieval_enhanced"

    context_chunks = [
        f"Query Scenario: {item['prompt']}\nRecommended Safety Action: {item['completion']}"
        for item in retrieved_items
    ]

    # Attempt Live AI generation if provider configured
    if settings.AI_PROVIDER == "gemini" and settings.GEMINI_API_KEY:
        answer_text = await call_gemini(message, conversation_history, context_chunks)
        if answer_text:
            response_mode = "live_ai"

    elif settings.AI_PROVIDER == "openai" and settings.OPENAI_API_KEY:
        answer_text = await call_openai(message, conversation_history, context_chunks)
        if answer_text:
            response_mode = "live_ai"

    # Fallback to high-quality retrieval synthesis from Adaption-enhanced dataset
    if not answer_text:
        answer_text = synthesize_retrieval_response(
            message,
            detected_lang,
            retrieved_items,
            conversation_history
        )
        response_mode = "retrieval_enhanced"

    # 6. Recommended Actions Extraction
    actions = []
    if "pin" in message.lower() or "qr" in message.lower():
        actions = ["Never enter PIN to receive money", "Decline unknown collect requests"]
    elif "link" in message.lower() or "sms" in message.lower():
        actions = ["Do not click the URL", "Verify via official bank app"]
    elif "police" in message.lower() or "cbi" in message.lower():
        actions = ["Disconnect video call", "Report to 1930 helpline"]
    else:
        actions = ["Keep credentials confidential", "Dial 1930 in financial emergency"]

    # 7. Follow-up suggestions
    followups = generate_followup_suggestions(detected_intent, detected_lang)

    log_safe_interaction(conversation_id, detected_intent, detected_lang, response_mode, len(message))

    return {
        "answer": answer_text,
        "detected_language": detected_lang,
        "detected_intent": detected_intent,
        "risk_level": risk_level,
        "response_mode": response_mode,
        "recommended_actions": actions,
        "sources": sources,
        "confidence": 0.95 if response_mode == "live_ai" else 0.90,
        "suggested_followups": followups
    }
