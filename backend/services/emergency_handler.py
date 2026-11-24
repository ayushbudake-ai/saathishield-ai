from typing import Dict, Any, List

def format_emergency_response(intent: str, lang: str, message: str = "") -> Dict[str, Any]:
    """
    Constructs immediate, prioritized crisis triage instructions.
    Calculates defensible evidence confidence based on verified knowledge retrieval relevance.
    """
    sources = [
        {
            "name": "National Cyber Crime Reporting Portal (1930)",
            "url": "https://cybercrime.gov.in",
            "authority": "Ministry of Home Affairs / I4C"
        },
        {
            "name": "Reserve Bank of India Customer Protection Directives",
            "url": "https://www.rbi.org.in/",
            "authority": "Reserve Bank of India"
        }
    ]

    if intent == "financial_fraud_emergency":
        if lang == "hi":
            answer = (
                "🚨 **आपातकालीन वित्तीय सुरक्षा सहायता (तुरंत कार्रवाई करें)**\n\n"
                "यदि आपके खाते से अनधिकृत पैसे कटे हैं, तो तुरंत आधिकारिक रिपोर्ट दर्ज कराएं ताकि संबंधित बैंक समय रहते ट्रांजेक्शन अलर्ट दर्ज कर सकें (महत्वपूर्ण: किसी भी राशि की वापसी अथवा खातों के फ्रीज होने की कोई गारंटी नहीं होती):\n\n"
                "1. **तुरंत 1930 पर कॉल करें**: भारत सरकार की राष्ट्रीय साइबर हेल्पलाइन **1930** पर तुरंत कॉल करें। यह प्रणाली बैंकों को अंतर-बैंक अलर्ट और लेन-देन पर रोक (Lien request) का अनुरोध प्रेषित करती है।\n"
                "2. **बैंक को तुरंत ब्लॉक करवाएं**: अपने बैंक के 24x7 आपातकालीन नंबर पर कॉल करके डेबिट कार्ड, UPI और नेटबैंकिंग को तुरंत निलंबित करवाएं ताकि आगे कोई कटौती न हो सके।\n"
                "3. **आवश्यक विवरण तैयार रखें**: अपना खाता नंबर, कटी हुई रकम, ट्रांजेक्शन आईडी (UTR नंबर / UPI Ref ID), सटीक समय और प्राप्तकर्ता की जानकारी नोट रखें।\n"
                "4. **साइबर पोर्टल पर औपचारिक शिकायत**: कॉल के बाद https://cybercrime.gov.in पर रिपोर्ट दर्ज करें और पावती संख्या (Acknowledgement) लेकर 3 कार्य दिवसों के भीतर अपनी बैंक शाखा में लिखित विवाद पत्र जमा करें।\n\n"
                "⚠️ अस्वीकरण: साथीशील्ड एक शैक्षिक नागरिक सुरक्षा सहायक है, कोई पुलिस या बैंक प्राधिकरण नहीं। फंड रिकवरी या फ्रीजिंग की कोई गारंटी नहीं दी जा सकती।"
            )
            actions = ["1930 पर तुरंत कॉल करें", "बैंक कार्ड और UPI ब्लॉक करें", "cybercrime.gov.in पर रिपोर्ट दर्ज करें"]
            followups = ["बैंक में लिखित शिकायत कैसे जमा करें?", "साइबर पोर्टल पर पावती रसीद कैसे प्राप्त करें?"]
        elif lang == "hi-en":
            answer = (
                "🚨 **EMERGENCY: Immediate Financial Triage Steps**\n\n"
                "Agar aapke bank account se unauthorized deduction hua hai, to foran official channels par report karein taaki banks alert record kar sakein (Important: Funds freeze ya recovery ki koi guaranteed assurance nahi hoti):\n\n"
                "1. **Dial 1930 Helpline Immediately**: Abhi foran **1930** National Cyber Crime Helpline par call karein. Ye system beneficiary banks ko inter-bank alert aur lien request send karta hai.\n"
                "2. **Block Bank & Card**: Apne bank customer care par call karke card, UPI aur netbanking foran suspend karwayein taaki aur transaction na ho sake.\n"
                "3. **Keep Details Ready**: Account number, exact deducted amount, UTR / Transaction Reference ID aur beneficiary details note kar lein.\n"
                "4. **File on cybercrime.gov.in**: 1930 call ke baad portal par formal complaint darj karein aur acknowledgment slip bank branch me 3 working days ke andar submit karein.\n\n"
                "⚠️ Disclaimer: SaathiShield is an educational citizen companion, not police or banking authority. Fund recovery or account freezing is never guaranteed."
            )
            actions = ["Dial 1930 Cyber Helpline", "Block card & netbanking", "File complaint at cybercrime.gov.in"]
            followups = ["What if 1930 helpline is busy?", "How does RBI 3-day customer notification rule work?"]
        else:
            answer = (
                "🚨 **ACTIVE FINANCIAL FRAUD: IMMEDIATE EMERGENCY TRIAGE**\n\n"
                "If unauthorized money has been debited from your account, act immediately through official authorities to maximize the chance that financial institutions can flag the transaction before cash withdrawal (Statutory Note: Fund recovery or account freezing is NEVER guaranteed):\n\n"
                "1. **Dial 1930 Immediately**: Call the National Cyber Crime Helpline **1930** (operated by I4C/MHA) right away. This system dispatches urgent inter-bank alerts and lien requests across beneficiary payment switches.\n"
                "2. **Emergency Bank Blockade**: Call your bank's verified 24x7 helpline to immediately suspend your debit card, UPI handles, and internet banking credentials.\n"
                "3. **Assemble Transaction Evidence**: Record your account number, exact debit timestamp, UTR reference number, and recipient UPI/account details.\n"
                "4. **Formal Portal Filing**: Register your complaint on https://cybercrime.gov.in, save the acknowledgment receipt, and submit a written dispute to your home bank branch within 3 working days.\n\n"
                "⚠️ Statutory Disclaimer: SaathiShield is an educational citizen guidance companion, not a law enforcement agency or bank. Fund recovery or account freezing is subject to formal investigation and is never guaranteed."
            )
            actions = ["Call 1930 Helpline immediately", "Block all bank accounts & cards", "Submit formal grievance on cybercrime.gov.in"]
            followups = ["How to notify home branch under RBI 3-day rule?", "What documents are needed for bank dispute?"]

    elif intent == "credential_leak_emergency":
        if lang == "hi":
            answer = (
                "🚨 **अति-संवेदनशील क्रेडेंशियल चेतावनी (OTP/PIN लीक)**\n\n"
                "आपने ठग के साथ गोपनीय विवरण साझा कर दिया है। नुकसान रोकने के लिए तुरंत ये कदम उठाएं:\n\n"
                "1. **UPI PIN बदलें या रीसेट करें**: तुरंत अपने UPI ऐप (GPay, PhonePe, Paytm) में जाकर 'Change UPI PIN' या 'Forgot PIN' पर क्लिक करके नया PIN बनाएं।\n"
                "2. **नेटबैंकिंग पासवर्ड रीसेट करें**: अपने बैंक की आधिकारिक वेबसाइट पर जाकर नेटबैंकिंग पासवर्ड तुरंत बदलें और 'Logout from all devices' चुनें।\n"
                "3. **कार्ड को Hotlist (ब्लॉक) करें**: यदि आपने कार्ड नंबर या CVV बताया है, तो तुरंत बैंक ऐप से कार्ड को स्थायी रूप से ब्लॉक करें।\n"
                "4. **खाता बैलेंस जांचें**: अपने अधिकृत बैंक ऐप में बैलेंस चेक करें। यदि कोई अनधिकृत कटौती हुई है, तो तुरंत **1930** पर कॉल करें।"
            )
            actions = ["UPI PIN तुरंत बदलें", "नेटबैंकिंग पासवर्ड रीसेट करें", "कार्ड ब्लॉक करें"]
            followups = ["क्या सिर्फ OTP से बैंक खाता खाली हो सकता है?", "अगर खाते से पैसे कट जाएं तो क्या करें?"]
        elif lang == "hi-en":
            answer = (
                "🚨 **URGENT: Credential Leak Containment**\n\n"
                "Aapne confidential OTP ya PIN share kar diya hai. Unauthorized loss prevent karne ke liye turant ye actions lein:\n\n"
                "1. **Change UPI PIN Now**: Google Pay ya PhonePe me jakar apna UPI PIN immediately change ya reset karein.\n"
                "2. **Reset Netbanking Password**: Official bank website par login karke password turant badlein aur saare active sessions log out karein.\n"
                "3. **Block Debit/Credit Card**: Agar card expiry ya CVV diya tha, to bank app se card foran block kar dein.\n"
                "4. **Check Account Balance**: Official statement check karein. Agar koi deduction hua ho, to without delay **1930** par call karein."
            )
            actions = ["Change UPI PIN immediately", "Reset netbanking password", "Hotlist/block payment card"]
            followups = ["Can they still access my account after I change PIN?", "How to check active UPI devices?"]
        else:
            answer = (
                "🚨 **CREDENTIAL COMPROMISE CONTAINMENT PROTOCOL**\n\n"
                "You have inadvertently disclosed sensitive authorization credentials. Take immediate defensive containment steps:\n\n"
                "1. **Rotate UPI PIN Immediately**: Open your UPI application (BHIM, PhonePe, Google Pay), select your linked bank account, and execute an immediate PIN change or reset.\n"
                "2. **Reset Internet Banking Password**: Navigate to your bank's authenticated web portal and update your netbanking password. Terminate all active sessions.\n"
                "3. **Hotlist Payment Cards**: If a card number, expiry date, or CVV was disclosed, temporarily freeze or permanently hotlist the card via your mobile banking app.\n"
                "4. **Inspect Balance & Dial 1930 if Debited**: Verify account statements. If any unauthorized transaction has initiated, immediately report it to the **1930** National Helpline."
            )
            actions = ["Rotate UPI PIN immediately", "Reset netbanking password", "Hotlist affected cards"]
            followups = ["How to ensure no unauthorized mandates were created?", "What to do if bank account is already debited?"]

    elif intent == "device_compromise_emergency":
        if lang == "hi":
            answer = (
                "🚨 **डिवाइस हैकिंग व रिमोट एक्सेस आपातकाल**\n\n"
                "यदि आपने किसी के कहने पर कोई .apk फाइल या रिमोट ऐप (AnyDesk, TeamViewer, RustDesk, QuickSupport) इंस्टॉल कर ली है:\n\n"
                "1. **इंटरनेट तुरंत बंद करें**: अपने फोन को तुरंत **'Airplane Mode' (हवाई जहाज मोड)** में डालें और Wi-Fi तथा मोबाइल डेटा बंद कर दें। इससे ठग का फोन से संपर्क उसी क्षण कट जाएगा।\n"
                "2. **संदिग्ध ऐप अनइंस्टॉल करें**: Settings > Apps में जाएं और AnyDesk, RustDesk या हाल ही में डाउनलोड की गई अनजान फाइल को 'Force Stop' करके अनइंस्टॉल (Delete) करें।\n"
                "3. **डिवाइस एडमिन एक्सेस हटाएं**: Settings > Security > Device Admin Apps में जाकर जांचें कि क्या किसी अनजान ऐप को एडमिन अधिकार मिले हैं। यदि हाँ, तो उसे बंद करें।\n"
                "4. **दूसरे सुरक्षित फोन से बैंक को कॉल करें**: किसी अन्य फोन से अपने बैंक को फोन करके अस्थायी रूप से नेटबैंकिंग फ्रीज करवाएं।"
            )
            actions = ["फोन को तुरंत Airplane Mode पर डालें", "रिमोट/APK ऐप अनइंस्टॉल करें", "दूसरे फोन से बैंक को सूचित करें"]
            followups = ["क्या फोन को फैक्ट्री रीसेट करना जरूरी है?", "मैलवेयर APK बैकग्राउंड में क्या चुराता है?"]
        elif lang == "hi-en":
            answer = (
                "🚨 **URGENT: Device Remote Compromise Containment**\n\n"
                "Agar aapne kisi ke kehne par unknown APK ya remote-access app (AnyDesk, RustDesk, TeamViewer) install kar li hai:\n\n"
                "1. **Disconnect Internet Immediately**: Phone ko foran **'Airplane Mode'** par daal dein, Wi-Fi aur mobile data band karein. Isse scammer ka remote connection instantly break ho jayega.\n"
                "2. **Uninstall Suspicious Application**: Phone Settings > Apps me jakar newly installed APK ya remote app ko Force Stop karke Uninstall karein.\n"
                "3. **Revoke Device Admin Rights**: Settings > Security > Device Admin Apps check karein aur unauthorized access disable karein.\n"
                "4. **Call Bank From Another Phone**: Kisi family member ke phone se bank ko call karke netbanking aur UPI temporarily disable karwayein."
            )
            actions = ["Turn on Airplane Mode immediately", "Uninstall remote app / APK", "Call bank from separate device"]
            followups = ["Do I need to factory reset my Android phone?", "How do APK trojans forward SMS OTPs?"]
        else:
            answer = (
                "🚨 **DEVICE COMPROMISE & REMOTE ACCESS CONTAINMENT**\n\n"
                "If you have executed an untrusted APK file or installed remote desktop software (AnyDesk, RustDesk, QuickSupport) at a caller's urging:\n\n"
                "1. **Sever All Network Connectivity**: Instantly enable **Airplane Mode**. Disconnect both Mobile Cellular Data and Wi-Fi. This severs the attacker's active command-and-control connection.\n"
                "2. **Uninstall Hostile Software**: Navigate to `Settings > Apps > See all apps`. Locate the remote viewer or suspicious utility, tap 'Force Stop', and select 'Uninstall'.\n"
                "3. **Audit Device Admin & Accessibility Permissions**: Check `Settings > Accessibility` and `Settings > Security > Device admin apps` to ensure no covert background services persist.\n"
                "4. **Notify Bank via Secondary Terminal**: Using an uncompromised family phone or desktop, contact your bank's fraud desk to suspend netbanking until your device is sanitized."
            )
            actions = ["Enable Airplane Mode immediately", "Uninstall remote viewer / malicious APK", "Audit Device Admin permissions"]
            followups = ["Is a complete factory data reset recommended?", "How to verify if SMS forwarding was enabled?"]

    else:
        # Default fallback for digital arrest coercion
        if lang == "hi":
            answer = (
                "🚨 **सावधान: यह 100% फर्जी 'डिजिटल अरेस्ट' धमकी है**\n\n"
                "घबराएं नहीं! गृह मंत्रालय और भारतीय साइबर अपराध समन्वय केंद्र (I4C) का स्पष्ट नियम याद रखें:\n\n"
                "1. **वीडियो कॉल तुरंत काटें**: भारत के कानून में 'डिजिटल अरेस्ट' जैसी कोई चीज नहीं होती। असली पुलिस या CBI कभी व्हाट्सएप/स्काइप वीडियो कॉल पर पूछताछ या गिरफ्तारी नहीं करती।\n"
                "2. **एक भी रुपया ट्रांसफर न करें**: सरकारी जांच एजेंसियां कभी भी किसी नागरिक को 'जांच' या 'RBI वेरिफिकेशन अकाउंट' के नाम पर पैसे भेजने को नहीं कहतीं।\n"
                "3. **तुरंत 1930 पर रिपोर्ट करें**: इस धमकी की जानकारी तुरंत **1930** राष्ट्रीय हेल्पलाइन पर दें या अपने नजदीकी पुलिस थाने में जाकर सूचित करें।"
            )
            actions = ["वीडियो कॉल तुरंत काट दें", "पैसे बिल्कुल ट्रांसफर न करें", "1930 हेल्पलाइन पर शिकायत करें"]
            followups = ["अगर उन्होंने मेरे आधार कार्ड का नंबर सही बताया तो?", "नकली कोर्ट नोटिस को कैसे पहचानें?"]
        elif lang == "hi-en":
            answer = (
                "🚨 **WARNING: 100% Fake 'Digital Arrest' Extortion Racket**\n\n"
                "Bilkul darein mat! Ministry of Home Affairs (I4C) ke official directions yaad rakhein:\n\n"
                "1. **Disconnect Video Call Now**: Indian law me 'Digital Arrest' jaisa koi provision nahi hai. Real Police, CBI ya Customs kabhi video call par arrest nahi karti.\n"
                "2. **Zero Money Transfer**: Police kabhi 'RBI Verification Account' ya clearance ke naam par paise transfer karne ko nahi bolti.\n"
                "3. **Report to 1930**: Is number ko block karein aur foran **1930** cyber helpline par report karein."
            )
            actions = ["Disconnect video call immediately", "Do not transfer any money", "Report number to 1930"]
            followups = ["What if they have my real Aadhaar number?", "How do scammers stage fake police station sets?"]
        else:
            answer = (
                "🚨 **EXTORTION ALERT: CONFIRMED 'DIGITAL ARREST' HOAX**\n\n"
                "Remain calm. This is an organized transnational extortion scheme officially cataloged by the Ministry of Home Affairs (I4C):\n\n"
                "1. **Terminate the Video Call**: There is NO statutory concept of 'Digital Arrest' in Indian jurisprudence. Law enforcement agencies (Police, CBI, ED, NCB) do not conduct virtual interrogations or arrests over Skype or WhatsApp.\n"
                "2. **Under NO Circumstances Transfer Funds**: Government authorities never solicit transfers into 'escrow' or 'RBI verification accounts' for clearance.\n"
                "3. **Lodge an Incident Report**: Disconnect, block the contact, and report the caller's phone number on **1930** or at https://cybercrime.gov.in."
            )
            actions = ["Terminate video call immediately", "Never transfer any funds", "Report incident to 1930"]
            followups = ["Why do scammers know my name and address?", "What legal actions does I4C take against digital arrest syndicates?"]

    confidence = 0.50
    if message:
        from backend.services.retriever import retriever
        retrieved = retriever.retrieve(message, detected_intent=intent, top_k=1, min_relevance_threshold=0.01)
        if retrieved:
            confidence = round(retrieved[0].get("relevance_score", 0.50), 2)

    return {
        "answer": answer,
        "detected_intent": intent,
        "detected_language": lang,
        "risk_level": "emergency",
        "response_mode": "emergency",
        "recommended_actions": actions,
        "sources": sources,
        "confidence": confidence,
        "suggested_followups": followups
    }
