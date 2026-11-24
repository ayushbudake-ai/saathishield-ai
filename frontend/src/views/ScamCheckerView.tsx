import React, { useState } from 'react';
import { AlertOctagon, ShieldAlert, CheckCircle2, ArrowRight, ShieldCheck, Lock, ExternalLink, RefreshCw } from 'lucide-react';
import { Language, ScamCheckResult } from '../types';
import { SAMPLE_SCAM_MESSAGES } from '../data/content';
import { analyzeScamMessage } from '../utils/engine';

interface ScamCheckerViewProps {
  language: Language;
}

export const ScamCheckerView: React.FC<ScamCheckerViewProps> = ({ language }) => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<ScamCheckResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [privacyAlert, setPrivacyAlert] = useState(false);

  const handleAnalyze = (textToTest?: string) => {
    const text = (textToTest || inputText).trim();
    if (!text) return;

    // Check if user accidentally pasted 16-digit card or 6-digit OTP
    if (/\b\d{16}\b/.test(text) || /\b(?:otp|pin)\s*[:=]?\s*\d{4,6}\b/i.test(text)) {
      setPrivacyAlert(true);
    } else {
      setPrivacyAlert(false);
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeScamMessage(text, language);
      setResult(res);
      setIsAnalyzing(false);
    }, 300);
  };

  const handleSelectSample = (sampleText: string) => {
    setInputText(sampleText);
    handleAnalyze(sampleText);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setPrivacyAlert(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1.5rem 0' }}>
      {/* View Header */}
      <div className="surface-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--color-warning-text)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)', padding: '0.5rem', borderRadius: '6px' }}>
            <AlertOctagon size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
              {language === 'hi' ? "संदिग्ध संदेश / SMS की जाँच करें" : "Suspicious Message & Scam Checker"}
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              {language === 'hi' 
                ? "व्हाट्सएप, SMS या ईमेल पर आया कोई भी संदिग्ध संदेश पेस्ट करें। हमारा इंजन सुरक्षा मानकों पर इसका विश्लेषण करेगा।"
                : "Analyze questionable SMS, WhatsApp messages, or payment requests using client-side safety heuristics."}
            </p>
          </div>
        </div>

        {/* Privacy Callout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-surface-subtle)', padding: '0.625rem 0.875rem', borderRadius: '6px', fontSize: '0.8125rem', color: 'var(--color-text-main)' }}>
          <Lock size={15} color="var(--color-brand-light)" />
          <span>
            {language === 'hi'
              ? "गोपनीयता सुरक्षा: यह टूल आपके संदेश को किसी सर्वर पर सेव नहीं करता। कृपया अपना असली OTP, पासवर्ड या बैंक खाता नंबर यहाँ पेस्ट न करें।"
              : "Privacy Guarantee: Client-side evaluation only. Never paste real passwords, account numbers, or OTPs."}
          </span>
        </div>
      </div>

      {/* Pre-loaded Sample Chips */}
      <div>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.625rem' }}>
          {language === 'hi' ? "परीक्षण के लिए सामान्य धोखाधड़ी संदेश चुनें:" : "Choose a realistic sample scam message to test:"}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {SAMPLE_SCAM_MESSAGES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(s.text)}
              className="btn-secondary"
              style={{ fontSize: '0.8125rem', padding: '0.4rem 0.875rem', borderRadius: '9999px' }}
            >
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Text Area Container */}
      <div className="surface-card" style={{ padding: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
          {language === 'hi' ? "संदेश का टेक्स्ट यहाँ पेस्ट करें:" : "Paste the message text here:"}
        </label>

        <textarea
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            language === 'hi'
              ? "उदाहरण: 'Dear consumer, your electricity power will disconnect tonight at 9.30 PM...'"
              : "Paste message text here to evaluate threat vectors..."
          }
          style={{ width: '100%', resize: 'vertical', lineHeight: 1.6, marginBottom: '1rem' }}
        />

        {privacyAlert && (
          <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', color: 'var(--color-danger-text)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8125rem', marginBottom: '1rem' }}>
            ⚠️ चेतावनी: ऐसा प्रतीत होता है कि आपने कोई कार्ड नंबर या OTP दर्ज किया है। सुरक्षा के लिए इसे तुरंत हटा दें।
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleAnalyze()}
            className="btn-primary"
            disabled={!inputText.trim() || isAnalyzing}
          >
            <ShieldAlert size={18} />
            <span>{isAnalyzing ? (language === 'hi' ? "विश्लेषण जारी..." : "Analyzing...") : (language === 'hi' ? "विश्लेषण करें" : "Analyze Message")}</span>
          </button>

          {inputText && (
            <button
              onClick={handleClear}
              className="btn-secondary"
            >
              <RefreshCw size={15} />
              <span>{language === 'hi' ? "साफ करें" : "Clear"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Analysis Output Section */}
      {result && (
        <div 
          className="surface-card" 
          style={{ 
            padding: '2rem', 
            borderTop: result.riskLevel === 'high' ? '4px solid var(--color-danger-text)' : result.riskLevel === 'suspicious' ? '4px solid var(--color-warning-text)' : '4px solid var(--color-success-text)' 
          }}
        >
          {/* Header of Result */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className={`badge ${result.riskLevel === 'high' ? 'badge-danger' : result.riskLevel === 'suspicious' ? 'badge-warning' : 'badge-success'}`}>
                  {result.riskLevel === 'high' ? "उच्च जोखिम (High Risk)" : result.riskLevel === 'suspicious' ? "संदिग्ध (Suspicious)" : "सुरक्षित (Safe)"}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  जोखिम स्कोर: <strong>{result.riskScore}/100</strong>
                </span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                {result.title}
              </h2>
            </div>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {result.explanation}
          </p>

          {/* Red flags list */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.75rem' }}>
              {language === 'hi' ? "पहचाने गए खतरे / रेड फ्लैग्स:" : "Identified Red Flags:"}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {result.redFlagsDetected.map((flag, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-surface-subtle)', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.875rem' }}>
                  <ShieldAlert size={16} color="var(--color-danger-text)" />
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Immediate Action Steps */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.75rem' }}>
              {language === 'hi' ? "आपको अभी क्या करना चाहिए (तत्काल कदम):" : "Immediate Recommended Action Steps:"}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem' }}>
              {result.immediateActions.map((act, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--color-brand-light)" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Helpline Reporting Link */}
          <div style={{ background: 'var(--color-surface-tint)', padding: '1rem 1.25rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-brand-primary)' }}>
                आधिकारिक शिकायत पोर्टल (Chakshu & 1930)
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                फर्जी SMS की शिकायत सीधे संचार साथी के चक्षु पोर्टल पर दर्ज करें
              </div>
            </div>
            <a
              href="https://sancharsaathi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.8125rem', padding: '0.4rem 0.875rem' }}
            >
              <span>Chakshu पोर्टल खोलें</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
