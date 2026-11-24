import React from 'react';
import { ShieldCheck, ExternalLink, Lock, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../data/content';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const strings = UI_STRINGS[language];

  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid var(--color-border-subtle)', marginTop: '4rem', padding: '3rem 0 2rem 0' }}>
      <div className="app-container">
        {/* Top footer row: Purpose & Official Portals */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{ background: 'var(--color-brand-primary)', color: '#FFFFFF', padding: '0.25rem', borderRadius: '4px', display: 'flex' }}>
                <ShieldCheck size={18} />
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-brand-primary)' }}>{strings.brandName}</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {strings.tagline} — An open-access citizen digital safety initiative engineered for the Hackyard x Adaption Dataset Challenge 2026.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--color-brand-light)', fontWeight: 500 }}>
              <Lock size={14} /> Privacy-First: No credentials, OTPs, or pasted text stored.
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
              Official Indian Cyber Safety Portals
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  National Cyber Crime Reporting Portal (1930) <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://sancharsaathi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Sanchar Saathi — Chakshu Fraud Reporting <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://www.rbi.org.in/commonman/English/Scripts/PressReleases.aspx" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  RBI Kehta Hai — Public Awareness Portal <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://i4c.mha.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Indian Cyber Crime Coordination Centre (I4C) <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://www.npci.org.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  National Payments Corporation of India (NPCI) <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
              Important Public Notice
            </h4>
            <div style={{ background: 'var(--color-surface-subtle)', border: '1px solid var(--color-border-subtle)', borderRadius: '6px', padding: '0.875rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-warning-text)', fontWeight: 600, marginBottom: '0.25rem' }}>
                <AlertCircle size={14} /> Non-Affiliation Disclaimer
              </div>
              {strings.disclaimerFooter} SaathiShield AI never asks for financial credentials, OTPs, or passwords.
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          <div>
            © 2026 SaathiShield AI. Hackyard x Adaption Dataset Challenge 2026.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Dataset: 460 Curated Pairs</span>
            <span>Benchmark: 105 Held-out Cases</span>
            <span>Grounding: 100% Verified Circulars</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
