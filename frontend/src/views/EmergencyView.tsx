import React from 'react';
import { PhoneCall, ShieldAlert, Clock, AlertTriangle, Building2, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { BANK_HELPLINES } from '../data/content';

interface EmergencyViewProps {
  language: Language;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({ language }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '1.5rem 0' }}>
      {/* Golden Hours Alert Banner */}
      <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: '8px', padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ background: 'var(--color-danger-text)', color: '#FFFFFF', padding: '0.5rem', borderRadius: '6px' }}>
            <Clock size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-danger-text)' }}>
              {language === 'hi' ? "आपातकालीन वित्तीय धोखाधड़ी: शुरुआती 2-3 घंटे (Golden Hours)" : "Active Cyber Fraud Emergency: Golden Hours Protocol"}
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
              {language === 'hi' 
                ? "यदि आपके बैंक खाते से अनधिकृत पैसे कटे हैं, तो समय पर शिकायत दर्ज कराएं ताकि बैंक स्तर पर जांच शुरू हो सके। (नोट: धन वापसी अथवा खाते फ्रीज होने की कोई कानूनी गारंटी नहीं होती)"
                : "If money has been unauthorizedly debited, act immediately through official helplines to flag the transaction before withdrawal. Note: Fund recovery is never guaranteed."}
            </p>
          </div>
        </div>

        {/* Direct Call 1930 Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="tel:1930"
            className="btn-danger"
            style={{ fontSize: '1.125rem', padding: '0.75rem 1.75rem' }}
          >
            <PhoneCall size={20} />
            <span>1930 पर तुरंत कॉल करें (Toll Free)</span>
          </a>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ fontSize: '1rem', padding: '0.75rem 1.25rem' }}
          >
            <span>cybercrime.gov.in पोर्टल खोलें</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* 4-Step Crisis Action Plan */}
      <section className="surface-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-brand-primary)', marginBottom: '1.5rem' }}>
          {language === 'hi' ? "पैसे कटने पर तुरंत क्या करें — 4 प्राथमिक चरण" : "Immediate 4-Step Action Checklist"}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div style={{ background: 'var(--color-surface-subtle)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--color-border-subtle)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-brand-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '0.75rem' }}>
              1
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.5rem' }}>
              {language === 'hi' ? "बैंक खाते व कार्ड को ब्लॉक करें" : "Block Bank Accounts & Cards"}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              अपने बैंक के 24x7 हेल्पलाइन पर कॉल करके डेबिट कार्ड, UPI और नेटबैंकिंग को तुरंत फ्रीज करवाएं ताकि ठग और पैसे न निकाल सकें।
            </p>
          </div>

          <div style={{ background: 'var(--color-surface-subtle)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--color-border-subtle)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-brand-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '0.75rem' }}>
              2
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.5rem' }}>
              {language === 'hi' ? "हेल्पलाइन 1930 पर कॉल करें" : "Dial Helpline 1930"}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              गृह मंत्रालय का 'Citizen Financial Cyber Fraud' सिस्टम ठग के बैंक खाते में पैसे पहुंचते ही उसे रास्ते में ही फ्रीज (Lien Mark) करवा देता है।
            </p>
          </div>

          <div style={{ background: 'var(--color-surface-subtle)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--color-border-subtle)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-brand-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '0.75rem' }}>
              3
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.5rem' }}>
              {language === 'hi' ? "लेन-देन का विवरण तैयार रखें" : "Keep Transaction Data Ready"}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              बैंक खाता नंबर, ठगी की रकम, ट्रांजेक्शन आईडी (UTR नंबर), समय और जिस UPI ID पर पैसे गए हैं, उसे एक कागज़ पर लिख लें।
            </p>
          </div>

          <div style={{ background: 'var(--color-surface-subtle)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--color-border-subtle)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-brand-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '0.75rem' }}>
              4
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.5rem' }}>
              {language === 'hi' ? "3 दिन के भीतर बैंक में लिखित शिकायत" : "Written Dispute within 3 Days"}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              cybercrime.gov.in की शिकायत रसीद लेकर 3 कार्य दिवसों के भीतर अपनी बैंक शाखा में लिखित पत्र दें ताकि RBI Zero Liability नियम का लाभ मिले।
            </p>
          </div>
        </div>
      </section>

      {/* Verified Indian Bank Emergency Directory */}
      <section className="surface-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Building2 size={22} color="var(--color-brand-primary)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
            {language === 'hi' ? "प्रमुख भारतीय बैंकों के 24x7 फ्रॉड हेल्पलाइन नंबर" : "Directory of Verified Indian Bank Fraud Helplines"}
          </h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface-tint)', color: 'var(--color-brand-primary)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)' }}>बैंक का नाम (Bank)</th>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)' }}>आपातकालीन फ्रॉड नंबर</th>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)' }}>कार्ड ब्लॉक SMS</th>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border-subtle)' }}>आधिकारिक वेबसाइट</th>
              </tr>
            </thead>
            <tbody>
              {BANK_HELPLINES.map((b, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{b.bankName}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--color-danger-text)', fontWeight: 600 }}>{b.emergencyFraudNumber}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{b.cardBlockSMS}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <a href={b.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      वेबसाइट <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
