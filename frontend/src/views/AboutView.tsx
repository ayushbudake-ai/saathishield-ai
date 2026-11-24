import React from 'react';
import { Info, Target, ShieldCheck, Database, Award, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface AboutViewProps {
  language: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ language }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '1.5rem 0' }}>
      {/* Header */}
      <div className="surface-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--color-brand-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ background: 'var(--color-surface-tint)', color: 'var(--color-brand-primary)', padding: '0.5rem', borderRadius: '6px' }}>
            <Info size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
              {language === 'hi' ? "परियोजना परिचय एवं कार्यप्रणाली" : "About SaathiShield AI & Methodology"}
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              {language === 'hi'
                ? "Hackyard x Adaption Dataset Challenge 2026 के लिए विकसित नागरिक सुरक्षा सहायक का पूर्ण विवरण।"
                : "Comprehensive architectural and empirical overview of the SaathiShield AI digital safety companion."}
            </p>
          </div>
        </div>
      </div>

      {/* Target Domain & User Group */}
      <section className="surface-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Target size={20} color="var(--color-brand-primary)" />
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
            1. लक्षित उपयोगकर्ता एवं समस्या परिभाषा (Target Problem & Audience)
          </h2>
        </div>

        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: '1rem' }}>
          भारत में हर महीने अरबों UPI लेन-देन होते हैं। लेकिन करोड़ों नए उपयोगकर्ता, बुजुर्ग नागरिक और अर्ध-शहरी/ग्रामीण लोग डिजिटल भुगतान से तो जुड़ गए हैं, लेकिन साइबर अपराध के जटिल तरीकों (जैसे QR कोड कलेक्ट रिक्वेस्ट, फर्जी बिजली बिल SMS, WhatsApp पर फर्जी पुलिस वीडियो कॉल) को समझ नहीं पाते।
        </p>

        <div style={{ background: 'var(--color-surface-subtle)', padding: '1rem', borderRadius: '6px', fontSize: '0.875rem', lineHeight: 1.6, borderLeft: '3px solid var(--color-brand-light)' }}>
          <strong>महत्वपूर्ण स्थिति (Positioning):</strong> हिन्दी भाषा स्वयं में पर्याप्त समर्थित है। साथीशील्ड का लक्षित दायरा (Underserved Domain) भाषा नहीं, बल्कि <em>"पहली बार UPI इस्तेमाल करने वाले और सुरक्षा मार्गदर्शन की आवश्यकता वाले नागरिक"</em> हैं, जिन्हें सरल, मातृभाषा में और बिना तकनीकी जटिलता के त्वरित सहायता चाहिए।
        </div>
      </section>

      {/* Dataset & Adaption Methodology */}
      <section className="surface-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Database size={20} color="var(--color-brand-primary)" />
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
            2. डेटासेट निर्माण एवं Adaption संवर्धन (Dataset & Adaption Workflow)
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.5rem' }}>
              क. बीज डेटासेट (460 इंस्ट्रक्शन जोड़े)
            </h3>
            <p style={{ color: 'var(--color-text-main)' }}>
              हमने 8 श्रेणियों में 460 परिदृश्यों का निर्माण किया (हिन्दी 37.4%, हिंग्लिश 31.7%, अंग्रेज़ी 30.9%)। प्रत्येक परिदृश्य को RBI, I4C, CERT-In और NPCI के आधिकारिक सर्कुलरों से सत्यापित किया गया।
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.5rem' }}>
              ख. Adaption प्लेटफॉर्म सुधार (+44.8%)
            </h3>
            <p style={{ color: 'var(--color-text-main)' }}>
              Adaption प्लेटफॉर्म के 'Prompt Deduplication' और 'House Special' व्यंजनों के माध्यम से संपादन किया गया। इससे उत्तरों में क्रमांकित चरण (Action Steps) और वैधानिक सुरक्षा चेतावनियाँ जुड़ीं, जिससे गुणवत्ता स्कोर <strong>5.8 से बढ़कर 8.4/10</strong> हो गया।
            </p>
          </div>
        </div>
      </section>

      {/* Independent Evaluation */}
      <section className="surface-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Award size={20} color="var(--color-brand-primary)" />
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
            3. निष्पक्ष हेल्ड-आउट मूल्यांकन (Independent Benchmark)
          </h2>
        </div>

        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: '1rem' }}>
          हमने 105 पूरी तरह से अप्रशिक्षित और अलग रखे गए (Held-out) सवालों पर मूल और संवर्धित डेटासेट की तुलना 5 मानकों (सटीकता, प्रक्रियात्मक चरण, भाषाई प्रवाह, सुरक्षा नियम, टोन) पर की। परिणाम दर्शाते हैं कि संवर्धित डेटासेट में <strong>कार्रवाई योग्य चरणों में +38.2%</strong> और समग्र स्कोर में <strong>+21.7% (3.92 ➔ 4.77)</strong> का वास्तविक सुधार आया।
        </p>
      </section>

      {/* Limitations & Legal Non-Affiliation */}
      <section className="surface-card" style={{ padding: '2rem', background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <AlertCircle size={20} color="var(--color-warning-text)" />
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-warning-text)' }}>
            4. सीमाएं एवं वैधानिक घोषणा (Limitations & Transparency)
          </h2>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
          <li>• <strong>शैक्षणिक उपयोग:</strong> साथीशील्ड AI एक जन-जागरूकता उपकरण है। यह पुलिस, बैंक, भारतीय रिज़र्व बैंक या कानूनी सलाहकार नहीं है।</li>
          <li>• <strong>रिकवरी गारंटी नहीं:</strong> यह प्रणाली पैसे वापस दिलाने की कोई झूठी गारंटी नहीं देती। वास्तविक नुकसान होने पर राष्ट्रीय हेल्पलाइन <strong>1930</strong> और संबंधित बैंक ही कानूनी प्रक्रिया चलाते हैं।</li>
          <li>• <strong>शून्य डेटा संग्रहण:</strong> यह प्रणाली उपयोगकर्ताओं के संवेदनशील बैंकिंग विवरण या OTP को न तो मांगती है और न ही संग्रहित करती है।</li>
        </ul>
      </section>
    </div>
  );
};
