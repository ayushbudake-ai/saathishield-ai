import { Language, LearningModule, BankHelpline, DatasetStatistics } from '../types';

export const UI_STRINGS: Record<Language, Record<string, string>> = {
  hi: {
    brandName: "साथीशील्ड AI",
    tagline: "आपका डिजिटल सुरक्षा साथी",
    officialStatus: "नागरिक साइबर सुरक्षा एवं वित्तीय धोखाधड़ी रोकथाम मंच",
    navHome: "होम",
    navAssistant: "सुरक्षा सहायक",
    navChecker: "संदेश जांचें",
    navEmergency: "आपातकालीन सहायता (1930)",
    navLearn: "जागरूकता केंद्र",
    navDashboard: "डेटा व परिणाम",
    navAbout: "हमारे बारे में",
    emergencyHelpline: "हेल्पलाइन 1930",
    dialEmergency: "कॉल करें 1930",
    disclaimerBanner: "आपातकालीन वित्तीय धोखाधड़ी? तुरंत 1930 डायल करें या cybercrime.gov.in पर रिपोर्ट करें। शुरुआती रिपोर्टिंग बैंकों को सतर्क करने में मदद करती है (रिकवरी की गारंटी नहीं है)।",
    heroTitle: "डिजिटल धोखाधड़ी से सुरक्षा, आपकी अपनी भाषा में।",
    heroSubtitle: "UPI फ्रॉड, फर्जी बिजली बिल, लॉटरी के झांसे और डिजिटल अरेस्ट जैसे खतरों को समझें, पहचानें और सुरक्षित रहें।",
    ctaAsk: "सुरक्षा सवाल पूछें",
    ctaCheck: "संदेश की जांच करें",
    ctaEmergency: "धोखाधड़ी की रिपोर्ट",
    whatWeDo: "साथीशील्ड क्या कर सकता है",
    whatWeDont: "साथीशील्ड क्या नहीं कर सकता",
    can1: "संदिग्ध SMS, WhatsApp संदेशों और भुगतानों के खतरों की निष्पक्ष जांच।",
    can2: "RBI, गृह मंत्रालय और NPCI के आधिकारिक नियमों के आधार पर सही कदम बताना।",
    can3: "धोखाधड़ी होने पर बैंक और 1930 पोर्टल पर तुरंत शिकायत दर्ज करने में सहायता।",
    cant1: "हम कोई बैंक, पुलिस विभाग या सरकारी संस्था नहीं हैं।",
    cant2: "हम खोए हुए पैसे की 100% रिकवरी की झूठी गारंटी नहीं देते।",
    cant3: "हम कभी भी आपका OTP, UPI PIN, पासवर्ड या बैंक खाता नंबर नहीं मांगते।",
    activeScamsTitle: "वर्तमान में सक्रिय धोखाधड़ी के तरीके",
    disclaimerFooter: "अस्वीकरण: साथीशील्ड AI एक गैर-व्यावसायिक शैक्षणिक एवं सुरक्षा जागरूकता उपकरण है। यह किसी भी सरकारी या वित्तीय संस्था से संबद्ध नहीं है।",
    verifiedGrounding: "100% आधिकारिक नियामक स्रोतों द्वारा सत्यापित"
  },
  'hi-en': {
    brandName: "SaathiShield AI",
    tagline: "Aapka Digital Suraksha Saathi",
    officialStatus: "Citizen Cyber Safety & Financial Fraud Awareness Platform",
    navHome: "Home",
    navAssistant: "Safety Assistant",
    navChecker: "Check Message",
    navEmergency: "Emergency Help (1930)",
    navLearn: "Learning Center",
    navDashboard: "Data & Results",
    navAbout: "About & Method",
    emergencyHelpline: "Helpline 1930",
    dialEmergency: "Call 1930",
    disclaimerBanner: "Financial cyber fraud emergency? Dial 1930 immediately or visit cybercrime.gov.in. Early reporting maximizes chances of flagging fraud (recovery is not guaranteed).",
    heroTitle: "Digital Fraud Se Suraksha, Aapki Apni Bhasha Mein.",
    heroSubtitle: "UPI frauds, fake electricity bills, suspicious APKs aur digital arrest threats ko pehchaniye aur safe rahiye.",
    ctaAsk: "Ask Safety Question",
    ctaCheck: "Check Suspicious Message",
    ctaEmergency: "Emergency Fraud Triage",
    whatWeDo: "SaathiShield Kya Karta Hai",
    whatWeDont: "SaathiShield Kya Nahi Karta",
    can1: "Suspicious SMS, WhatsApp messages aur payment requests ka accurate analysis.",
    can2: "RBI aur Cyber Crime Portal guidelines ke basis par verified next steps.",
    can3: "Financial fraud hone par step-by-step reporting guide.",
    cant1: "Hum police, bank ya government agency nahi hain.",
    cant2: "Hum stolen money recovery ki koi false guarantee nahi dete.",
    cant3: "Hum kabhi bhi aapka OTP, UPI PIN ya passwords nahi maangte.",
    activeScamsTitle: "Currently Trending Fraud Vectors in India",
    disclaimerFooter: "Disclaimer: SaathiShield AI is an educational digital safety project developed for Hackyard x Adaption 2026.",
    verifiedGrounding: "100% Grounded in Official Regulatory Guidelines"
  },
  en: {
    brandName: "SaathiShield AI",
    tagline: "Your Digital Safety Companion",
    officialStatus: "Public Cyber Safety & Financial Scam Mitigation Platform",
    navHome: "Home",
    navAssistant: "AI Safety Assistant",
    navChecker: "Scam Message Checker",
    navEmergency: "Emergency Help (1930)",
    navLearn: "Learning Center",
    navDashboard: "Dataset & Results",
    navAbout: "About & Methodology",
    emergencyHelpline: "Helpline 1930",
    dialEmergency: "Call 1930",
    disclaimerBanner: "Active financial cyber fraud? Dial 1930 immediately or visit cybercrime.gov.in. Early reporting maximizes chances of flagging fraudulent transfers (recovery is never guaranteed).",
    heroTitle: "Accessible Digital Fraud Protection in Your Native Language.",
    heroSubtitle: "Empowering first-time UPI users, families, and senior citizens against payment traps, fake KYC phishing, and digital arrest extortion.",
    ctaAsk: "Ask Safety Assistant",
    ctaCheck: "Analyze Suspicious Message",
    ctaEmergency: "Emergency Fraud Triage",
    whatWeDo: "What SaathiShield Does",
    whatWeDont: "What SaathiShield Does NOT Do",
    can1: "Analyzes suspicious SMS, WhatsApp lures, and payment requests safely.",
    can2: "Provides statutory next steps grounded in RBI and I4C regulatory circulars.",
    can3: "Guides citizens through immediate 1930 reporting and bank dispute filings.",
    cant1: "We are NOT a bank, law enforcement agency, or government department.",
    cant2: "We do NOT promise or guarantee monetary fund recovery.",
    cant3: "We NEVER solicit OTPs, UPI PINs, passwords, or banking credentials.",
    activeScamsTitle: "Active Cyber Threat Intelligence",
    disclaimerFooter: "Disclaimer: SaathiShield AI is an independent academic and educational safety initiative developed for Hackyard x Adaption 2026.",
    verifiedGrounding: "100% Grounded in RBI, I4C, NPCI & Sanchar Saathi Advisories"
  }
};

export const SAMPLE_SCAM_MESSAGES = [
  {
    title: "बिजली बिल डिस्कनेक्शन SMS (Electricity Disconnection)",
    text: "Dear consumer your electricity power will be disconnected tonight at 9.30 PM from electricity office because your previous month bill was not updated. Please immediately contact our power officer at 9811442211. Thank you.",
    language: "en"
  },
  {
    title: "PhonePe ₹4,999 कैशबैक कलेक्ट रिक्वेस्ट (Cashback Collect Request)",
    text: "PhonePe: You have won a cash reward of ₹4,999! Click here to accept payment directly into your bank account. Enter UPI PIN to approve the transaction.",
    language: "hi-en"
  },
  {
    title: "व्हाट्सएप शादी कार्ड APK ट्रोजन (Wedding Invitation APK)",
    text: "नमस्ते जी, हमारी बिटिया की शादी 5 दिसंबर को तय हुई है। शादी का डिजिटल निमंत्रण कार्ड नीचे दी गई फाइल में है। कृपया जरूर पधारें: Shaadi_Invitation_Card.apk",
    language: "hi"
  },
  {
    title: "SBI YONO खाता ब्लॉक फ़िशिंग (Bank KYC Suspension Link)",
    text: "Dear SBI User, your YONO account is suspended today due to expired KYC. Update your PAN card immediately to avoid permanent freeze: https://bit.ly/sbi-pan-update-2026",
    language: "en"
  },
  {
    title: "फर्जी डिजिटल अरेस्ट CBI नोटिस (Digital Arrest Video Call Threat)",
    text: "This is Cyber Cell New Delhi. A FedEx parcel sent in your name containing 14 fake passports and 200g MDMA narcotics has been seized at Mumbai airport. You are placed under Digital Arrest. Join Skype video call immediately for RBI verification.",
    language: "en"
  }
];

export const SUGGESTED_PROMPTS: Record<Language, string[]> = {
  hi: [
    "क्या पैसे पाने के लिए कभी QR कोड स्कैन या UPI PIN डालना पड़ता है?",
    "बिजली बिल कटने का SMS आया है, क्या करूँ?",
    "व्हाट्सएप पर पुलिस बनकर वीडियो कॉल आई है कि पार्सल में ड्रग्स मिले हैं",
    "बैंक खाते से बिना मेरी जानकारी के पैसे कट गए हैं, अभी क्या करूँ?",
    "अनजान रिश्तेदार के नाम से .apk फाइल आई है, क्या खोलना सुरक्षित है?"
  ],
  'hi-en': [
    "Kya receive money karne ke liye mujhe PhonePe me UPI PIN daalna padta hai?",
    "Electricity bill cut hone ka SMS aaya with 10-digit number. Is it fake?",
    "Digital arrest kya hota hai aur fake police call se kaise bachein?",
    "Account se 20,000 debit ho gaya unauthorized, 1930 par complain kaise karein?",
    "Telegram par YouTube like karke paise kamane wali job safe hai kya?"
  ],
  en: [
    "Do I ever need to enter my UPI PIN or scan a QR code to receive funds?",
    "I received an electricity disconnection SMS asking to call a personal number",
    "Someone on WhatsApp claiming to be CBI says I am under Digital Arrest",
    "Money was fraudulently debited from my account 15 minutes ago. What do I do?",
    "What are the official RBI guidelines on zero customer liability for cyber fraud?"
  ]
};

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "upi-pin-rule",
    title: "The Golden Rule of UPI PIN",
    tagline: "पैसे प्राप्त करने के लिए PIN कभी नहीं लगता",
    threatType: "UPI & QR Code Fraud",
    summary: "One of the most widespread scams in India targets sellers on OLX or recipients of fake cashback. Fraudsters exploit the misunderstanding between 'sending' and 'receiving' money.",
    howItWorks: [
      "Fraudster poses as a buyer or sends a fake cashback notification.",
      "Sends a QR code or a UPI 'Collect Request' disguised as a reward.",
      "Instructs the victim to scan the QR code and enter their 4 or 6 digit UPI PIN to receive money.",
      "The moment PIN is entered, funds are deducted from the victim's account."
    ],
    redFlags: [
      "Any statement like 'Scan this QR code to receive your advance payment'.",
      "UPI Collect requests with amounts like ₹4999 or ₹9999.",
      "Buyers claiming they cannot pay via normal mobile number due to 'Army/Merchant account rules'."
    ],
    safeActionSteps: [
      "Remember: You ONLY enter your UPI PIN to SEND money, never to RECEIVE money.",
      "Reject and decline unknown UPI Collect Requests immediately.",
      "Never share payment confirmation screenshots containing your balance."
    ],
    officialSource: "NPCI UPI Safety Shield & RBI Kehta Hai",
    sourceUrl: "https://www.npci.org.in/what-we-do/upi/security-tips"
  },
  {
    id: "digital-arrest",
    title: "The 'Digital Arrest' Extortion Racket",
    tagline: "भारत के कानून में डिजिटल अरेस्ट का कोई प्रावधान नहीं है",
    threatType: "Extortion & Coercion",
    summary: "Cyber syndicates pose as police, CBI, ED, or court judges over Skype and WhatsApp video calls to terrify victims into transferring life savings into fake government clearance accounts.",
    howItWorks: [
      "Victim receives an automated call claiming an illegal parcel under their Aadhaar was intercepted.",
      "Call transfers to a 'police officer' sitting in a realistic staged police station backdrop.",
      "Victim is threatened with non-bailable arrest warrants and told not to leave their room ('Digital Arrest').",
      "Scammers coerce the victim into transferring money into an 'RBI Verification Account' which is actually a mule account."
    ],
    redFlags: [
      "Police or CBI conducting interrogation over WhatsApp or Skype video calls.",
      "Demands to remain on continuous camera and keep family members in the dark.",
      "Requests to transfer money to 'clear charges' or 'prove innocence'."
    ],
    safeActionSteps: [
      "Understand the law: No Indian law enforcement agency ever conducts arrests via video calls.",
      "Disconnect the call immediately without engaging in debate.",
      "Report the phone number immediately on 1930 and inform local police."
    ],
    officialSource: "Ministry of Home Affairs (I4C) National Advisory",
    sourceUrl: "https://i4c.mha.gov.in/"
  },
  {
    id: "fake-kyc-sms",
    title: "Fake Electricity & Bank KYC Phishing",
    tagline: "असली बैंक या बिजली विभाग 10 अंकों के नंबर से SMS नहीं भेजते",
    threatType: "Phishing & Social Engineering",
    summary: "Panic-inducing messages warning that electricity will be cut off tonight or your bank account will be blocked within 24 hours.",
    howItWorks: [
      "Victim receives SMS: 'Dear consumer, power will disconnect at 9:30 PM due to unpaid bill'.",
      "A personal 10-digit mobile number is given to call.",
      "When the victim calls, fraudster asks them to pay ₹10 recharge via an APK file or install AnyDesk.",
      "The app harvests banking OTPs and empties the account."
    ],
    redFlags: [
      "SMS sent from personal numbers (+91-9xxxxxxxxx) instead of official headers (VM-SBI, BP-UPPCL).",
      "Artificial urgency: 'Disconnected in 2 hours', 'Account suspended today'.",
      "Shortened links (bit.ly, tinyurl, ngrok) requesting PAN or Aadhaar."
    ],
    safeActionSteps: [
      "Never call numbers provided in unsolicited warning SMS.",
      "Check electricity bill or bank status directly on the official registered utility app.",
      "Forward fraudulent SMS to 1909 or report on Sanchar Saathi (Chakshu)."
    ],
    officialSource: "Department of Telecommunications (Sanchar Saathi)",
    sourceUrl: "https://sancharsaathi.gov.in/"
  },
  {
    id: "apk-malware",
    title: "Android APK Trojans & Wedding Cards",
    tagline: "WhatsApp पर आई .apk फाइल कभी इंस्टॉल न करें",
    threatType: "Mobile Malware & Spyware",
    summary: "Attackers package malicious Android applications (.apk) disguised as wedding invitations, traffic challans, PM-Kisan subsidy forms, or bank updates.",
    howItWorks: [
      "An APK file named 'Shaadi_Card.apk' or 'Vahan_Challan.apk' is sent on WhatsApp.",
      "Once installed, the app requests SMS read permissions and accessibility services.",
      "It hides its icon and forwards all incoming banking OTPs directly to attackers in real time."
    ],
    redFlags: [
      "Files ending with '.apk' sent by friends or unknown numbers.",
      "Prompt asking to enable 'Install from Unknown Sources' in Android settings.",
      "Sudden cessation of SMS notifications after installing an app."
    ],
    safeActionSteps: [
      "Never open or install APK files received on messaging platforms.",
      "Only install apps from the official Google Play Store.",
      "If infected, turn on Airplane mode immediately and factory reset device."
    ],
    officialSource: "CERT-In Vulnerability Advisory",
    sourceUrl: "https://www.cert-in.org.in/"
  },
  {
    id: "telegram-task-jobs",
    title: "Part-Time Task & YouTube Rating Scams",
    tagline: "घर बैठे वीडियो लाइक करके पैसे कमाने का कोई असली काम नहीं होता",
    threatType: "Work From Home / Investment Fraud",
    summary: "Victims are lured into Telegram groups with promises of earning ₹3,000 to ₹5,000 daily by simply rating hotels or liking YouTube videos.",
    howItWorks: [
      "Victim is paid ₹150 for liking 3 videos to establish credibility.",
      "They are then introduced to 'Prepaid VIP Tasks' requiring ₹5,000 deposit for 30% profit.",
      "Victims see fake profits on a rigged website, but cannot withdraw funds.",
      "Scammers demand additional lakhs in taxes and fees before disappearing."
    ],
    redFlags: [
      "Unsolicited WhatsApp job offers offering hundreds of rupees for trivial clicks.",
      "Requirement to join private Telegram channels to receive assignments.",
      "Demands to deposit personal money in order to unlock earned commissions."
    ],
    safeActionSteps: [
      "Recognize that genuine corporations do not hire anonymous clickers via Telegram.",
      "Never transfer funds to unlock work-from-home earnings.",
      "Report Telegram channels to Cyber Crime Portal."
    ],
    officialSource: "CyberDost (MHA) Advisory on Rating Scams",
    sourceUrl: "https://cyberdost.mha.gov.in/"
  },
  {
    id: "screen-sharing-remote",
    title: "Screen-Sharing Remote Access Trojans",
    tagline: "कस्टमर केयर कभी AnyDesk या TeamViewer डाउनलोड नहीं करवाता",
    threatType: "Remote Device Takeover",
    summary: "Scammers claiming to be bank or e-commerce customer support persuade victims to install remote desktop software, allowing them to view OTPs and control the device.",
    howItWorks: [
      "Victim searches for a customer care number on Google Search and calls a fake number.",
      "Scammer claims a refund is pending and asks victim to install AnyDesk or RustDesk.",
      "Victim shares the 9-digit code, giving the scammer visual access to their phone screen.",
      "Scammer asks victim to open banking app and reads credentials and OTPs in real time."
    ],
    redFlags: [
      "Customer care asking to install AnyDesk, TeamViewer, QuickSupport, or RustDesk.",
      "Requesting a 9-digit remote connection code.",
      "Asking you to log in to your bank account while the screen is connected."
    ],
    safeActionSteps: [
      "Customer care NEVER requires screen sharing to resolve transaction issues.",
      "Never search for bank helpline numbers on Google; check the back of your debit card.",
      "If someone connects, disconnect internet immediately and uninstall the app."
    ],
    officialSource: "Reserve Bank of India Consumer Advisory",
    sourceUrl: "https://www.rbi.org.in/"
  },
  {
    id: "wrong-transfer-trap",
    title: "The Accidental Credit / Money Mule Trap",
    tagline: "गलती से आए पैसे को खुद सीधे वापस न भेजें",
    threatType: "Account Freeze & Mule Laundering",
    summary: "A stranger claims they mistakenly sent money to your UPI and asks you to refund it immediately to a new number, putting your account at risk of police freezing.",
    howItWorks: [
      "Scammer sends a forged credit SMS or transfers stolen funds into your account.",
      "They call in distress begging for an immediate refund to a different UPI ID.",
      "If you transfer the money, your account becomes an accomplice node in cybercrime records.",
      "When the actual victim files a 1930 complaint, cyber police freeze your bank account."
    ],
    redFlags: [
      "Caller demanding immediate refund without giving time to verify bank balance.",
      "Asking you to send money to a completely different UPI ID than the one it supposedly came from."
    ],
    safeActionSteps: [
      "Verify your actual balance through official netbanking, not by reading incoming SMS.",
      "Inform the caller: 'Please file an official wrong-transfer dispute at your bank; my bank will reverse it officially.'",
      "Never transfer funds directly to any third-party account."
    ],
    officialSource: "Citizen Financial Cyber Fraud Reporting System (CFCFRMS)",
    sourceUrl: "https://cybercrime.gov.in/"
  },
  {
    id: "biometric-aadhaar-lock",
    title: "Aadhaar Biometric Locking (AePS Safety)",
    tagline: "mAadhaar ऐप से अपना फिंगरप्रिंट लॉक रखें",
    threatType: "Biometric Identity Protection",
    summary: "Aadhaar Enabled Payment System (AePS) allows cash withdrawals using thumbprints. Attackers harvest fingerprints from land registry documents to empty rural and senior accounts.",
    howItWorks: [
      "Attackers obtain scanned property documents containing thumbprints.",
      "Replicate silicon biometric models to trigger micro-ATM withdrawals without OTPs.",
      "Victim receives debit alerts without ever swiping a card or sharing a PIN."
    ],
    redFlags: [
      "Unexplained SMS debits marked 'AePS transaction' while your phone is with you."
    ],
    safeActionSteps: [
      "Open the official mAadhaar app or visit uidai.gov.in.",
      "Activate 'Lock Biometrics'. When locked, no one (not even you) can make AePS withdrawals.",
      "Temporarily unlock biometrics only when you personally need to visit a bank, then lock again."
    ],
    officialSource: "UIDAI Biometric Security Standard",
    sourceUrl: "https://uidai.gov.in/"
  }
];

export const BANK_HELPLINES: BankHelpline[] = [
  {
    bankName: "National Cyber Fraud Helpline",
    emergencyFraudNumber: "1930 (Toll-Free 24x7)",
    cardBlockSMS: "Report online at cybercrime.gov.in",
    officialApp: "CyberCrime Portal (MHA)",
    website: "https://cybercrime.gov.in"
  },
  {
    bankName: "State Bank of India (SBI)",
    emergencyFraudNumber: "1800 1234 / 1800 2100",
    cardBlockSMS: "SMS 'BLOCK <last 4 digits>' to 567676",
    officialApp: "SBI YONO",
    website: "https://bank.sbi"
  },
  {
    bankName: "HDFC Bank",
    emergencyFraudNumber: "1800 1600 / 1800 266 4060",
    cardBlockSMS: "SMS 'BLOCK' to 5676712",
    officialApp: "HDFC Bank MobileBanking",
    website: "https://www.hdfcbank.com"
  },
  {
    bankName: "ICICI Bank",
    emergencyFraudNumber: "1800 1080",
    cardBlockSMS: "SMS 'IBLOCK <last 4 digits>' to 9215667766",
    officialApp: "iMobile Pay",
    website: "https://www.icicibank.com"
  },
  {
    bankName: "Punjab National Bank (PNB)",
    emergencyFraudNumber: "1800 180 2222 / 1800 103 2222",
    cardBlockSMS: "SMS 'HOT <Card No>' to 5607040",
    officialApp: "PNB ONE",
    website: "https://www.pnbindia.in"
  },
  {
    bankName: "Bank of Baroda (BoB)",
    emergencyFraudNumber: "1800 258 4455 / 1800 102 4455",
    cardBlockSMS: "SMS 'BLOCK <last 4 digits>' to 8422009988",
    officialApp: "bob World",
    website: "https://www.bankofbaroda.in"
  },
  {
    bankName: "Axis Bank",
    emergencyFraudNumber: "1800 419 5959",
    cardBlockSMS: "SMS 'BLOCK <last 4 digits>' to 5676782",
    officialApp: "Axis Mobile",
    website: "https://www.axisbank.com"
  }
];

export const DATASET_STATS: DatasetStatistics = {
  totalRecords: 460,
  categoriesCount: 8,
  languagesCount: 3,
  baselineQualityScore: 5.8,
  enhancedQualityScore: 8.4,
  relativeGainPct: "+44.8%",
  heldOutTestCount: 105,
  heldOutBaselineScore: 3.92,
  heldOutEnhancedScore: 4.77,
  actionabilityGainPct: "+38.2%",
  lastValidationDate: "2026-11-24"
};
