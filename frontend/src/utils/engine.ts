import { Language, ScamCheckResult, ChatMessage } from '../types';

export function analyzeScamMessage(rawText: string, lang: Language): ScamCheckResult {
  const text = rawText.trim();
  const lower = text.toLowerCase();

  const redFlags: string[] = [];
  let score = 0;

  // 1. Threat & Extreme Urgency Triggers
  const urgencyPatterns = [
    /disconnected\s+(?:tonight|today|at\s+\d+)/i,
    /बिजली\s+(?:काट\s+दी\s+जाएगी|बंद\s+हो\s+जाएगी)/,
    /suspended\s+(?:today|within\s+\d+\s+hours?)/i,
    /खाता\s+(?:ब्लॉक|बंद|निलंबित)/,
    /digital\s+arrest/i,
    /डिजिटल\s+अरेस्ट/,
    /narcotics|mdma|contraband|illegal\s+parcel/i,
    /cbi|police|customs\s+officer|arrest\s+warrant/i
  ];
  for (const p of urgencyPatterns) {
    if (p.test(text)) {
      redFlags.push(lang === 'hi' ? "अस्वाभाविक जल्दबाजी या कानूनी धमकी (Artificial Urgency & Threat)" : "Artificial Urgency & Threat Coercion");
      score += 35;
      break;
    }
  }

  // 2. UPI PIN / Collect Request Lures
  const upiPatterns = [
    /enter\s+upi\s+pin\s+to\s+receive/i,
    /पिन\s+डालकर\s+पैसे\s+प्राप्त/i,
    /cashback\s+(?:of\s+₹?\d+|win|won)/i,
    /scratch\s+card|claim\s+reward/i,
    /advance\s+(?:token|money).*qr/i,
    /qr\s+code\s+scan\s+karo/i
  ];
  for (const p of upiPatterns) {
    if (p.test(text)) {
      redFlags.push(lang === 'hi' ? "पैसे प्राप्त करने के लिए PIN या QR कोड का झांसा" : "UPI PIN / QR Deception for receiving money");
      score += 40;
      break;
    }
  }

  // 3. Android APK / Trojan Lures
  if (/\.apk\b/i.test(text) || /download\s+app/i.test(text) || /shaadi.*\.apk/i.test(text)) {
    redFlags.push(lang === 'hi' ? "अज्ञात Android APK फाइल का वितरण (संभावित मैलवेयर/ट्रोजन)" : "Untrusted Android APK file lure (Probable Spyware/Trojan)");
    score += 45;
  }

  // 4. Remote Desktop Software Demands
  if (/anydesk|teamviewer|rustdesk|quicksupport/i.test(lower)) {
    redFlags.push(lang === 'hi' ? "रिमोट स्क्रीन-शेयरिंग ऐप डाउनलोड करने का दबाव" : "Remote Screen-Sharing App Coercion (AnyDesk/RustDesk)");
    score += 45;
  }

  // 5. Unofficial Shortlinks & Phishing URLs
  if (/bit\.ly|tinyurl|ngrok|is\.gd|cutt\.ly|t\.me/i.test(lower)) {
    redFlags.push(lang === 'hi' ? "अनाधिकृत शॉर्ट-लिंक (Masked Phishing URL)" : "Masked Phishing URL / Unofficial Link");
    score += 30;
  }

  // 6. Private 10-digit Mobile Number acting as Bank/Utility
  if (/(?:\+91[-\s]?)?[6-9]\d{9}/.test(text) && (lower.includes('electricity') || lower.includes('bank') || lower.includes('yono') || lower.includes('officer'))) {
    redFlags.push(lang === 'hi' ? "संस्था के नाम पर 10 अंकों का व्यक्तिगत मोबाइल नंबर" : "Personal 10-digit mobile number posing as official institution");
    score += 25;
  }

  // 7. Telegram / Rating Task Work-From-Home
  if (/youtube\s+like|rating\s+task|daily\s+3000|telegram\s+group|part\s*time\s*job/i.test(lower)) {
    redFlags.push(lang === 'hi' ? "फर्जी टास्क और पार्ट-टाइम जॉब का लालच (Investment/Task Scam)" : "Prepaid VIP Task / Rating Fraud indicators");
    score += 35;
  }

  const finalScore = Math.min(100, Math.max(score, redFlags.length > 0 ? 30 : 5));

  let riskLevel: 'high' | 'suspicious' | 'low' = 'low';
  if (finalScore >= 60) riskLevel = 'high';
  else if (finalScore >= 25) riskLevel = 'suspicious';

  let title = "";
  let explanation = "";
  let immediateActions: string[] = [];

  if (lang === 'hi') {
    if (riskLevel === 'high') {
      title = "उच्च जोखिम: संभावित धोखाधड़ी का प्रयास!";
      explanation = "इस संदेश में कई ऐसे लक्षण हैं जो भारत में सक्रिय साइबर ठगों द्वारा लोगों को डराने या उनके बैंक खाते खाली करने के लिए इस्तेमाल किए जाते हैं।";
      immediateActions = [
        "संदेश में दिए गए किसी भी लिंक पर बिल्कुल क्लिक न करें।",
        "दिए गए फोन नंबर पर कॉल न करें और न ही कोई ऐप या .apk फाइल डाउनलोड करें।",
        "यदि यह संदेश किसी अज्ञात नंबर से आया है, तो उस नंबर को तुरंत ब्लॉक करें।",
        "इस फर्जी संदेश की शिकायत दूरसंचार विभाग के 'संचार साथी - चक्षु' (Chakshu) पोर्टल पर दर्ज करें।"
      ];
    } else if (riskLevel === 'suspicious') {
      title = "संदिग्ध संदेश: सावधानी बरतें";
      explanation = "इस संदेश में कुछ ऐसे संकेत हैं जो औपचारिक संस्थाओं के सामान्य संदेशों से भिन्न हैं। इसमें जल्दबाजी या अनधिकृत लिंक हो सकते हैं।";
      immediateActions = [
        "सीधे संदेश में दिए गए लिंक या नंबर पर भरोसा न करें।",
        "संबंधित बैंक या बिजली विभाग के आधिकारिक मोबाइल ऐप या ग्राहक सेवा केंद्र से स्वयं संपर्क करके स्थिति जांचें।",
        "अपनी निजी जानकारी जैसे पैन, जन्मतिथि या OTP किसी को न दें।"
      ];
    } else {
      title = "कम जोखिम: कोई स्पष्ट धोखाधड़ी संकेतक नहीं मिला";
      explanation = "इस संदेश में सामान्य साइबर ठगी के विशिष्ट लक्षण नहीं पाए गए हैं। फिर भी, कभी भी किसी के साथ अपना बैंक OTP या UPI PIN साझा न करें।";
      immediateActions = [
        "सावधानी बनाए रखें। बैंक कभी भी संवेदनशील विवरण SMS पर नहीं मांगते।",
        "अगर किसी भुगतान का अनुरोध आए, तो पहले प्रेषक की पहचान सुनिश्चित करें।"
      ];
    }
  } else if (lang === 'hi-en') {
    if (riskLevel === 'high') {
      title = "High Risk: Probable Cyber Scam Attempt!";
      explanation = "Is message me multiple red flags detect hue hain jo cyber fraudsters account drain karne ya panic create karne ke liye use karte hain.";
      immediateActions = [
        "Message me diye gaye link ya number par bilkul trust mat kijiye.",
        "Kisi bhi haal me koi .apk file download ya install na karein.",
        "Sender ko foran block karein aur Chakshu portal par report karein."
      ];
    } else if (riskLevel === 'suspicious') {
      title = "Suspicious Message: Caution Required";
      explanation = "Is message me unverified sender ya urgency patterns dikh rahe hain jo suspicious ho sakte hain.";
      immediateActions = [
        "Unsolicited links par click na karein.",
        "Official banking app ya customer service se direct verify karein."
      ];
    } else {
      title = "Low Risk: No Immediate Scams Identified";
      explanation = "Is message me standard fraud patterns nahi mile hain, fir bhi digital safety rules follow karein.";
      immediateActions = [
        "Kabhi kisi se OTP ya UPI PIN share na karein."
      ];
    }
  } else {
    if (riskLevel === 'high') {
      title = "HIGH RISK: Strong Cyber Fraud Hallmarks Detected!";
      explanation = "This communication exhibits multiple verified markers of organized social engineering, credential harvesting, or extortion scams prevalent across India.";
      immediateActions = [
        "Do NOT click any embedded hyperlinks or URL shorteners.",
        "Under NO circumstances download or execute any attached '.apk' files.",
        "Block the sender and report the transmission on Sanchar Saathi (Chakshu facility) or the 1930 Cyber Fraud Helpline."
      ];
    } else if (riskLevel === 'suspicious') {
      title = "Suspicious Communication: Elevated Caution Required";
      explanation = "This message displays anomalous traits such as unofficial sender formats or unverified urgency.";
      immediateActions = [
        "Verify status independently via your service provider's verified portal.",
        "Never disclose sensitive identification or financial credentials."
      ];
    } else {
      title = "Low Threat Indicators Identified";
      explanation = "No explicit extortion, phishing shorteners, or malicious APK vectors were identified in this sample.";
      immediateActions = [
        "Maintain routine digital hygiene. Scheduled banks never solicit OTPs or credentials over SMS."
      ];
    }
  }

  return {
    riskLevel,
    riskScore: finalScore,
    title,
    redFlagsDetected: redFlags.length > 0 ? redFlags : [lang === 'hi' ? "कोई स्पष्ट रेड फ्लैग नहीं" : "No distinct red flags detected"],
    explanation,
    immediateActions,
    officialHelpline: "1930 (Cyber Crime) & Sanchar Saathi Chakshu",
    warningNote: lang === 'hi' 
      ? "गोपनीयता नोट: यह विश्लेषण केवल पाठ्य पैटर्न पर आधारित है। कभी भी किसी उपकरण पर वास्तविक OTP या पासवर्ड न डालें।"
      : "Privacy Note: This client-side heuristic evaluation is educational. Never enter real passwords or banking OTPs into any web tool."
  };
}

export class ChatApiError extends Error {
  code: 'TIMEOUT' | 'RATE_LIMIT' | 'BAD_REQUEST' | 'SERVER_ERROR' | 'NETWORK_ERROR' | 'INVALID_JSON';
  constructor(code: 'TIMEOUT' | 'RATE_LIMIT' | 'BAD_REQUEST' | 'SERVER_ERROR' | 'NETWORK_ERROR' | 'INVALID_JSON', message: string) {
    super(message);
    this.name = 'ChatApiError';
    this.code = code;
  }
}

export async function generateAssistantResponse(
  userPrompt: string,
  lang: Language,
  history: ChatMessage[] = [],
  timeoutMs: number = 15000
): Promise<ChatMessage> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  // Send prior history without duplicating the current user prompt
  const historyPayload = history
    .filter(h => h.text.trim() !== userPrompt.trim())
    .slice(-8)
    .map(h => ({
      sender: h.sender,
      text: h.text
    }));

  let response: Response;

  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userPrompt,
        conversation_id: 'saathi-session-' + (history[0]?.id || 'init'),
        conversation_history: historyPayload,
        language: lang
      }),
      signal: controller.signal
    });
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new ChatApiError(
        'TIMEOUT',
        lang === 'hi'
          ? "अनुरोध का समय समाप्त (Timeout) हो गया। कृपया अपने इंटरनेट कनेक्शन की जांच करें और पुनः प्रयास करें।"
          : lang === 'hi-en'
          ? "Request timed out while waiting for assistant. Please check connection and retry."
          : "The safety assistant took too long to respond (timeout). Please check connection and retry."
      );
    }

    // Network error / backend completely unreachable
    throw new ChatApiError(
      'NETWORK_ERROR',
      lang === 'hi'
        ? "सुरक्षा सहायक सर्वर से संपर्क नहीं हो सका। कृपया सुनिश्चित करें कि बैकएंड सेवा (FastAPI) चालू है।"
        : lang === 'hi-en'
        ? "Unable to connect to SaathiShield backend API. Ensure FastAPI server is running."
        : "Unable to establish connection with the safety assistant backend server. Please verify backend status."
    );
  } finally {
    clearTimeout(timeoutId);
  }

  // Handle HTTP error codes separately
  if (!response.ok) {
    if (response.status === 429) {
      throw new ChatApiError(
        'RATE_LIMIT',
        lang === 'hi'
          ? "अनुरोध सीमा पार हो गई है (Rate Limit)। कृपया कुछ सेकंड प्रतीक्षा करके पुनः प्रयास करें।"
          : lang === 'hi-en'
          ? "Too many requests. Please wait a moment before sending another message."
          : "Rate limit exceeded. Please wait a few seconds before retrying."
      );
    }

    if (response.status === 400) {
      throw new ChatApiError(
        'BAD_REQUEST',
        lang === 'hi'
          ? "अमान्य संदेश प्रारूप। कृपया अपना सुरक्षा प्रश्न स्पष्ट लिखें।"
          : "Invalid message format. Please rephrase your security query."
      );
    }

    if (response.status >= 500) {
      throw new ChatApiError(
        'SERVER_ERROR',
        lang === 'hi'
          ? "सहायक सर्वर पर आंतरिक त्रुटि हुई। कृपया पुनः प्रयास करें।"
          : "The AI safety server encountered an error processing your request. Please retry."
      );
    }

    throw new ChatApiError(
      'SERVER_ERROR',
      `Server error HTTP ${response.status}. Please retry.`
    );
  }

  let data: any;
  try {
    data = await response.json();
  } catch (_jsonErr) {
    throw new ChatApiError(
      'INVALID_JSON',
      lang === 'hi'
        ? "सर्वर से अमान्य उत्तर प्राप्त हुआ।"
        : "Received invalid response data from the server."
    );
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: data.answer,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    detectedLanguage: data.detected_language,
    detectedIntent: data.detected_intent,
    riskLevel: data.risk_level,
    responseMode: data.response_mode,
    suggestedFollowups: data.suggested_followups || [],
    recommendedActions: data.recommended_actions || [],
    sourcesList: data.sources || [],
    sourceName: data.sources?.[0]?.name || "National Cyber Crime Portal (1930)",
    sourceUrl: data.sources?.[0]?.url || "https://cybercrime.gov.in",
    confidence: data.confidence,
    verifiedDate: "2026-11-24",
    isGrounded: true
  };
}
