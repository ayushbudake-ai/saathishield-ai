import re
from typing import List, Dict, Tuple

# Comprehensive bidirectional regex patterns for multilingual citizen intents
INTENT_PATTERNS = {
    "financial_fraud_emergency": [
        r'(?:पैसे|रुपये|रुपए|paise|rupaye|rupees|money|balance|amount|funds|rs\b|inr).{0,35}(?:कट|kat|kata|kate|debited|deduct|stolen|lost|गायब|चोरी|fraud|ud\s+gaye|nikal)',
        r'(?:खाते|account|bank).{0,35}(?:कट|kat|kata|kate|debited|खाली|unauthorized\s+debit|unauthorized\s+transaction|stolen)',
        r'(?:someone|kisi\s+ne|caller).{0,35}(?:taken\s+money|paise\s+nikal|transferred\s+my\s+money|debited)',
        r'(?:transferred|sent|bheje|paid|de\s+diye).{0,30}(?:money|amount|funds|paise|rupaye).{0,30}(?:scammer|fraud|thug|cheat|unknown)',
        r'(?:unauthorized\s+transaction|fraud\s+debit|बिना\s+अनुमति\s+पैसे|debited\s+money\s+without\s+permission|debited\s+without)'
    ],
    "video_extortion_emergency": [
        r'(?:threaten|blackmail|धमकी|डरा\s+रहा|intimidat).{0,35}(?:video\s+call|whatsapp|skype|कॉल|वीडियो)',
        r'(?:video\s+call|whatsapp|skype|कॉल|वीडियो).{0,35}(?:threaten|blackmail|धमकी|डरा\s+रहा|intimidat)'
    ],
    "credential_leak_emergency": [
        r'(?:otp|pin|पिन|ओटीपी|password|पासवर्ड|cvv).{0,35}(?:बता\s+दिया|bata\s+diya|share|दे\s+दिया|de\s+diya|bhej\s+diya|entered|daal\s+diya|diya\s+hai|caller)',
        r'(?:bata\s+diya|share\s+kar\s+diya|entered|typed|gave\s+my|shared\s+my).{0,35}(?:otp|pin|पिन|ओटीपी|password|cvv)',
        r'(?:i\s+shared\s+my\s+otp|maine\s+galti\s+se\s+pin\s+bata\s+diya|shared\s+my\s+otp\s+with\s+a\s+caller)'
    ],
    "device_compromise_emergency": [
        r'(?:already\s+installed|installed\s+it|downloaded|कर\s+लिया|install\s+ho\s+gaya)',
        r'(?:install|download|चालू|चल\s+रहा|open|खोला).{0,35}(?:app|apk|anydesk|rustdesk|teamviewer|quicksupport|application)',
        r'(?:app|apk|anydesk|rustdesk|teamviewer|quicksupport|application).{0,35}(?:install|download|did\s+it|कर\s+लिया|हो\s+गई)',
        r'(?:someone\s+is\s+controlling\s+my\s+phone|phone\s+hack\s+ho\s+gaya|स्क्रीन\s+शेयर\s+हो\s+रहा|फोन\s+कंट्रोल|controlling\s+my\s+phone)'
    ],
    "remote_access_apk": [
        r'(?:shaadi.*apk|wedding.*apk|\.apk\b|apk\s+aaya|apk\s+file|vahan.*apk|bijli.*apk|fake\s+app)',
        r'(?:anydesk|rustdesk|teamviewer|quicksupport|screen\s+sharing\s+app|share\s+my\s+screen)'
    ],
    "digital_arrest_coercion": [
        r'(?:digital\s+arrest|डिजिटल\s+अरेस्ट)',
        r'(?:cbi|police|customs|ed\b|narcotics|कस्टम|पुलिस|courthouse|supreme\s+court).{0,35}(?:call|video|arrest|parcel|पार्सल|वारंट|warrant|narcotics|mdma)',
        r'(?:call|video|arrest|parcel|वारंट).{0,35}(?:cbi|police|customs|ed\b|narcotics|कस्टम|पुलिस)'
    ],
    "upi_payment_fraud": [
        r'(?:qr\s+code|बारकोड|qr\s+scan|स्कैन).{0,35}(?:receive|paise\s+aane|advance|पैसे\s+लेने|पैसे\s+प्राप्त)',
        r'(?:receive|paise\s+aane|advance|पैसे\s+लेने|पैसे\s+प्राप्त).{0,35}(?:qr\s+code|बारकोड|qr\s+scan|स्कैन)',
        r'(?:upi\s+pin|पिन).{0,35}(?:receive|पैसे\s+लेने|credit|paise\s+aane|cashback)',
        r'(?:cashback|scratch\s+card|इनाम).{0,35}(?:claim|collect|approve|phonepe|gpay|paytm)',
        r'(?:wrong\s+transfer|accidental\s+transfer|गलती\s+से\s+पैसे\s+भेज)'
    ],
    "otp_pin_safety": [
        r'(?:difference\s+between\s+upi\s+id\s+and\s+upi\s+pin|upi\s+id\s+vs\s+upi\s+pin)',
        r'(?:ask|मांग|share|साझा|tell|batao|chahiye).{0,35}(?:upi\s+pin|otp|पिन|ओटीपी|password|cvv)',
        r'(?:upi\s+pin|otp|पिन|ओटीपी|password|cvv).{0,35}(?:ask|मांग|share|साझा|tell|batao|safe|सुरक्षित)',
        r'(?:credit\s+card\s+reward|पॉइंट\s+कैश|रिवॉर्ड\s+पॉइंट)'
    ],
    "phishing_fake_kyc": [
        r'(?:electricity|power|bijli|बिजली).{0,35}(?:cut|disconnect|बंद|काट|bill|बिल)',
        r'(?:sbi\s+yono|bank\s+account|pan\s+card|kyc|केवाईसी|sim\b).{0,35}(?:block|suspend|deactivate|बंद|freeze|update\s+link)'
    ],
    "whatsapp_social_engineering": [
        r'(?:youtube\s+like|rating\s+task|work\s+from\s+home|hotel\s+review|telegram\s+group|यूट्यूब\s+लाइक|टास्क\s+जॉब)',
        r'(?:kbc\s+lottery|lottery\s+winner|25\s+lakh\s+lottery|customs\s+gift)'
    ],
    "bank_dispute_reporting": [
        r'(?:rbi\s+guidelines|zero\s+liability|ombudsman|bank\s+complaint|dispute\s+form|1930\s+helpline|लिखित\s+शिकायत|शिकायत\s+प्रक्रिया)'
    ]
}

def detect_intent(
    message: str, 
    conversation_history: List[Dict[str, str]] = None
) -> Tuple[str, str]:
    """
    Detects the primary intent and associated risk level:
    Returns (intent_name, risk_level) where risk_level is 'emergency', 'high', 'moderate', or 'informational'.
    """
    text = message.lower().strip()

    # 1. First priority: Check Emergency Trigger Patterns
    for emergency_intent in ["financial_fraud_emergency", "credential_leak_emergency", "device_compromise_emergency", "video_extortion_emergency"]:
        for pattern in INTENT_PATTERNS[emergency_intent]:
            if re.search(pattern, text, re.IGNORECASE):
                return emergency_intent, "emergency"

    # 2. Check Threat & High Risk Vectors
    for high_intent in ["digital_arrest_coercion", "upi_payment_fraud", "phishing_fake_kyc", "whatsapp_social_engineering", "otp_pin_safety", "remote_access_apk"]:
        for pattern in INTENT_PATTERNS[high_intent]:
            if re.search(pattern, text, re.IGNORECASE):
                return high_intent, "high"

    # 3. Context inheritance for multi-turn follow-up messages
    if conversation_history:
        prev_user_messages = [h.get("text", "") for h in conversation_history if h.get("sender") == "user"]
        if prev_user_messages:
            combined_history = " ".join(prev_user_messages[-3:]).lower()
            
            # Follow-up asking about UPI compromise after installing AnyDesk/APK
            if any(k in text for k in ["access my upi", "access upi", "upi hack", "bank access", "steal money", "khata khali"]):
                if any(w in combined_history for w in ["anydesk", "rustdesk", "teamviewer", "apk", "app", "installed", "remote"]):
                    return "device_compromise_emergency", "emergency"

            # Ambiguous short follow-ups
            if len(text.split()) <= 14:
                if any(k in text for k in ["clicked", "click", "installed", "install", "next", "ab kya", "access", "did it", "open", "khol liya"]):
                    if any(w in combined_history for w in ["apk", "app", "download", "anydesk", "teamviewer", "application"]):
                        return "device_compromise_emergency", "emergency"
                    if any(w in combined_history for w in ["link", "sms", "pan", "kyc"]):
                        return "phishing_fake_kyc", "high"
                    if any(w in combined_history for w in ["police", "arrest", "cbi", "parcel"]):
                        return "digital_arrest_coercion", "high"
                    if any(w in combined_history for w in ["pin", "qr", "upi", "cashback"]):
                        return "upi_payment_fraud", "high"

    # 4. Standard dispute or informational intents
    for pattern in INTENT_PATTERNS["bank_dispute_reporting"]:
        if re.search(pattern, text, re.IGNORECASE):
            return "bank_dispute_reporting", "moderate"

    # General safety or open-ended
    if any(k in text for k in ["safe", "suraksha", "security", "rule", "habits", "advice", "help", "scam", "fraud", "protect", "why", "difference", "teach"]):
        return "general_cybersecurity", "informational"

    return "general_cybersecurity", "informational"
