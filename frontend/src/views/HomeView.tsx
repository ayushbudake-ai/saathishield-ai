import React from 'react';
import { 
  ShieldAlert, 
  MessageSquare, 
  AlertOctagon, 
  PhoneCall, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Zap, 
  FileWarning, 
  Smartphone, 
  Users 
} from 'lucide-react';
import { Language, NavigationTab } from '../types';
import { UI_STRINGS } from '../data/content';

interface HomeViewProps {
  language: Language;
  onNavigate: (tab: NavigationTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ language, onNavigate }) => {
  const strings = UI_STRINGS[language];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '1.5rem 0' }}>
      {/* Hero Section */}
      <section className="tint-card" style={{ padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '820px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '1.25rem', border: '1px solid #CBDCD2' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success-text)' }}></span>
            {strings.officialStatus}
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-brand-primary)', lineHeight: 1.25, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            {strings.heroTitle}
          </h1>

          <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-main)', lineHeight: 1.6, marginBottom: '2rem' }}>
            {strings.heroSubtitle}
          </p>

          {/* 3 Core Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onNavigate('assistant')}
              className="btn-primary"
              style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
            >
              <MessageSquare size={18} />
              {strings.ctaAsk}
            </button>

            <button 
              onClick={() => onNavigate('checker')}
              className="btn-secondary"
              style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
            >
              <AlertOctagon size={18} />
              {strings.ctaCheck}
            </button>

            <button 
              onClick={() => onNavigate('emergency')}
              className="btn-danger"
              style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
            >
              <PhoneCall size={18} />
              {strings.ctaEmergency}
            </button>
          </div>
        </div>
      </section>

      {/* 3 Quick Triage Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        <div 
          onClick={() => onNavigate('assistant')}
          className="surface-card" 
          style={{ cursor: 'pointer', transition: 'border-color 0.2s', borderLeft: '4px solid var(--color-brand-primary)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ background: 'var(--color-surface-tint)', color: 'var(--color-brand-primary)', padding: '0.5rem', borderRadius: '6px' }}>
              <MessageSquare size={20} />
            </div>
            <ArrowRight size={18} color="var(--color-text-muted)" />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.5rem' }}>
            {language === 'hi' ? "सुरक्षा सवाल पूछें" : "AI Safety Assistant"}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            {language === 'hi' 
              ? "UPI PIN के नियम, संदिग्ध कॉल, या बैंक खाते से जुड़े किसी भी सुरक्षा संदेह का तुरंत समाधान।"
              : "Get instant verified guidance grounded in RBI, NPCI, and cybercrime advisory circulars."}
          </p>
        </div>

        <div 
          onClick={() => onNavigate('checker')}
          className="surface-card" 
          style={{ cursor: 'pointer', transition: 'border-color 0.2s', borderLeft: '4px solid var(--color-warning-text)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning-text)', padding: '0.5rem', borderRadius: '6px' }}>
              <AlertOctagon size={20} />
            </div>
            <ArrowRight size={18} color="var(--color-text-muted)" />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.5rem' }}>
            {language === 'hi' ? "संदिग्ध संदेश जांचें" : "Scam Message Checker"}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            {language === 'hi' 
              ? "SMS या WhatsApp संदेश को पेस्ट करें। हमारा इंजन बिना कोई डेटा सेव किए रेड-फ्लैग्स का विश्लेषण करेगा।"
              : "Paste suspicious SMS or WhatsApp text for private, client-side heuristic threat detection."}
          </p>
        </div>

        <div 
          onClick={() => onNavigate('emergency')}
          className="surface-card" 
          style={{ cursor: 'pointer', transition: 'border-color 0.2s', borderLeft: '4px solid var(--color-danger-text)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger-text)', padding: '0.5rem', borderRadius: '6px' }}>
              <PhoneCall size={20} />
            </div>
            <ArrowRight size={18} color="var(--color-text-muted)" />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-danger-text)', marginBottom: '0.5rem' }}>
            {language === 'hi' ? "आपातकालीन 1930 सहायता" : "Emergency Fraud Triage (1930)"}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            {language === 'hi' 
              ? "पैसे कट गए हैं? जानिए शुरुआती 2-3 घंटे (Golden Hours) में बैंक फ्रीज और 1930 पर रिपोर्ट करने के चरण।"
              : "Stolen funds? Follow the 4-step emergency triage protocol to halt transactions within the golden hours."}
          </p>
        </div>
      </section>

      {/* Active Cyber Threat Radar */}
      <section className="surface-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
              {strings.activeScamsTitle}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              {language === 'hi' ? "भारत में नागरिकों को निशाना बनाने वाले 4 प्रमुख साइबर धोखाधड़ी प्रकार" : "Top 4 active cyber fraud attack vectors observed across India"}
            </p>
          </div>
          <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <ShieldAlert size={14} /> लाइव चेतावनी
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--color-surface-subtle)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--color-border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-danger-text)', fontWeight: 600, marginBottom: '0.375rem' }}>
              <Zap size={16} /> बिजली बिल डिस्कनेक्शन SMS
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              "आज रात 9:30 बजे बिजली कटेगी..." — 10 अंकों वाले व्यक्तिगत नंबरों से फर्जी SMS भेजकर AnyDesk ऐप डाउनलोड करवाने की ठगी।
            </p>
          </div>

          <div style={{ background: 'var(--color-surface-subtle)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--color-border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-danger-text)', fontWeight: 600, marginBottom: '0.375rem' }}>
              <FileWarning size={16} /> शादी का निमंत्रण .APK ट्रोजन
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              WhatsApp पर 'Shaadi_Card.apk' भेजकर फोन में स्पाइवेयर डालना जो आने वाले बैंक OTPs को सीधे ठगों को फॉरवर्ड करता है।
            </p>
          </div>

          <div style={{ background: 'var(--color-surface-subtle)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--color-border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-danger-text)', fontWeight: 600, marginBottom: '0.375rem' }}>
              <Users size={16} /> फर्जी 'डिजिटल अरेस्ट' वीडियो कॉल
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              फर्जी CBI या पुलिस की वर्दी में वीडियो कॉल करके पार्सल में ड्रग्स मिलने का डर दिखाकर लाखों रुपये जबरन ट्रांसफर करवाना।
            </p>
          </div>

          <div style={{ background: 'var(--color-surface-subtle)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--color-border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-danger-text)', fontWeight: 600, marginBottom: '0.375rem' }}>
              <Smartphone size={16} /> PhonePe ₹4,999 कैशबैक रिक्वेस्ट
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              कैशबैक का लालच देकर 'UPI Collect Request' भेजना जिसमें 'Pay' दबाकर PIN डालते ही खाते से पैसे कट जाते हैं।
            </p>
          </div>
        </div>
      </section>

      {/* Capability Boundary Matrix (What we do vs what we don't) */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <div className="surface-card" style={{ borderTop: '3px solid var(--color-success-text)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <CheckCircle2 color="var(--color-success-text)" size={20} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-brand-primary)' }}>
              {strings.whatWeDo}
            </h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-success-text)', fontWeight: 700 }}>✓</span>
              <span>{strings.can1}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-success-text)', fontWeight: 700 }}>✓</span>
              <span>{strings.can2}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-success-text)', fontWeight: 700 }}>✓</span>
              <span>{strings.can3}</span>
            </li>
          </ul>
        </div>

        <div className="surface-card" style={{ borderTop: '3px solid var(--color-danger-text)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <XCircle color="var(--color-danger-text)" size={20} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-danger-text)' }}>
              {strings.whatWeDont}
            </h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-danger-text)', fontWeight: 700 }}>✕</span>
              <span>{strings.cant1}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-danger-text)', fontWeight: 700 }}>✕</span>
              <span>{strings.cant2}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-danger-text)', fontWeight: 700 }}>✕</span>
              <span>{strings.cant3}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
