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
            return ["क्या अनजान APK से फोन हैक हो सकता है?", "AnyDesk ऐप से पैसे कैसे चोरी होते हैं?", "क्या फोन को फैक्ट्री रीसेट करना चाहिए?"]
        elif "upi" in intent or "pin" in intent:
            return ["क्या QR कोड स्कैन करने से पैसे कटते हैं?", "UPI ID और UPI PIN में क्या अंतर है?", "गलती से भेजे पैसे कैसे वापस लाएं?"]
        elif "phishing" in intent or "kyc" in intent:
            return ["असली बैंक SMS की पहचान कैसे करें?", "बिजली बिल फ्रॉड की शिकायत कहाँ करें?", "Chakshu पोर्टल पर रिपोर्ट कैसे करें?"]
        elif "digital_arrest" in intent:
            return ["क्या पुलिस वीडियो कॉल पर अरेस्ट कर सकती है?", "नकली कोर्ट नोटिस की पहचान कैसे करें?", "1930 पर तुरंत शिकायत कैसे करें?"]
        else:
            return ["साइबर हेल्पलाइन 1930 कैसे काम करती है?", "Aadhaar बायोमेट्रिक लॉक कैसे करें?", "बैंक में शिकायत दर्ज करने की समय-सीमा क्या है?"]
    elif lang == "hi-en":
        if "remote_access" in intent or "apk" in intent or "device" in intent:
            return ["Can APK malware read bank OTPs?", "What to do if already installed?", "Can they access my UPI account now?"]
        elif "upi" in intent or "pin" in intent:
            return ["Can money be deducted just by QR scan?", "What is the difference between UPI ID and PIN?", "What is wrong transfer scam?"]
        elif "phishing" in intent or "kyc" in intent:
            return ["How to identify fake bank SMS headers?", "How to report on Chakshu portal?", "What if I clicked the link?"]
        elif "digital_arrest" in intent:
            return ["Can police arrest on Skype video call?", "What is an RBI verification account?", "How to verify genuine police summons?"]
        else:
            return ["How does 1930 helpline alert banks?", "How to lock Aadhaar biometric?", "Why is immediate reporting critical?"]
    else:
        if "remote_access" in intent or "apk" in intent or "device" in intent:
            return ["How do APK trojans intercept SMS OTPs?", "How to audit Android Device Admin permissions?", "Can they access my UPI now?"]
        elif "upi" in intent or "pin" in intent:
            return ["Do I ever need a PIN to receive funds?", "What is the difference between UPI ID and UPI PIN?", "How do UPI collect requests work?"]
        elif "phishing" in intent or "kyc" in intent:
            return ["What are TRAI approved SMS headers?", "How to report phishing on Chakshu?", "What if I clicked a suspicious link?"]
        elif "digital_arrest" in intent:
            return ["Can Indian police arrest via Skype call?", "What is the legal arrest procedure?", "How to identify synthetic police uniforms?"]
        else:
            return ["How does immediate 1930 reporting help banks?", "How to invoke RBI zero liability rule?", "How do scammers create psychological urgency?"]

def determine_recommended_actions(intent: str, risk_level: str) -> List[str]:
    """Dynamically determines action badges based on detected intent and risk."""
    if risk_level == "emergency":
        return [
            "Dial 1930 National Cyber Helpline immediately",
            "Contact home bank to suspend netbanking & cards",
            "Collect transaction reference (UTR) numbers",
            "Lodge formal complaint on cybercrime.gov.in"
        ]
    if "upi" in intent or "pin" in intent:
        return [
            "Never enter UPI PIN to receive funds",
            "Decline incoming collect requests immediately",
            "Block caller/sender on your payment application"
        ]
    if "remote_access" in intent or "device" in intent or "apk" in intent:
        return [
            "Do not install APKs from WhatsApp, SMS or unverified links",
            "Never install AnyDesk or screen-sharing tools on caller requests",
            "Check Device Admin and Accessibility permissions in Settings"
        ]
    if "phishing" in intent or "kyc" in intent:
        return [
            "Do not click links or call phone numbers in SMS",
            "Verify billing/KYC status via official bank/discom apps",
            "Report fraudulent SMS on DoT Chakshu (sancharsaathi.gov.in)"
        ]
    if "digital_arrest" in intent:
        return [
            "Disconnect video call immediately — digital arrest is 100% fake",
            "Never transfer funds to any 'verification' bank account",
            "Lodge complaint with local police or 1930 helpline"
        ]
    return [
        "Maintain confidentiality of passwords, OTPs, and PINs",
        "Verify institutional claims via official branch or certified apps",
        "Report active cyber fraud incidents to helpline 1930"
    ]

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

    # 2. Detect intent & risk level with conversational context
    detected_intent, risk_level = detect_intent(message, conversation_history)

    # 3. Emergency Fast-Path Check
    if risk_level == "emergency":
        resp = format_emergency_response(detected_intent, detected_lang, message=message)
        log_safe_interaction(conversation_id, detected_intent, detected_lang, "emergency", len(message))
        return resp

    # 4. Retrieve Grounded Knowledge using TF-IDF similarity
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
    response_mode = "retrieval_only"
    confidence = 0.50

    context_chunks = [
        f"Verified Scenario: {item['prompt']}\nRecommended Safety Action: {item['completion']}"
        for item in retrieved_items
    ]

    # Attempt Live AI generation if provider is configured and available
    if settings.AI_PROVIDER == "gemini" and settings.GEMINI_API_KEY:
        answer_text = await call_gemini(message, conversation_history, context_chunks)
        if answer_text:
            response_mode = "live_ai"
            top_retrieval_sim = retrieved_items[0].get("relevance_score", 0.0) if retrieved_items else 0.0
            confidence = round(top_retrieval_sim, 2)

    elif settings.AI_PROVIDER == "openai" and settings.OPENAI_API_KEY:
        answer_text = await call_openai(message, conversation_history, context_chunks)
        if answer_text:
            response_mode = "live_ai"
            top_retrieval_sim = retrieved_items[0].get("relevance_score", 0.0) if retrieved_items else 0.0
            confidence = round(top_retrieval_sim, 2)

    # Fallback to retrieval-only mode if no live AI is active or if generation failed
    if not answer_text:
        answer_text, confidence = synthesize_retrieval_response(
            message,
            detected_lang,
            retrieved_items,
            conversation_history
        )
        response_mode = "retrieval_only"

    # 6. Dynamic Recommended Actions
    actions = determine_recommended_actions(detected_intent, risk_level)

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
        "confidence": confidence,
        "suggested_followups": followups
    }
