import React, { useState } from 'react';
import { BookOpen, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { LEARNING_MODULES } from '../data/content';

interface LearnViewProps {
  language: Language;
}

export const LearnView: React.FC<LearnViewProps> = ({ language }) => {
  const [expandedId, setExpandedId] = useState<string | null>("upi-pin-rule");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1.5rem 0' }}>
      {/* Header */}
      <div className="surface-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--color-brand-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ background: 'var(--color-surface-tint)', color: 'var(--color-brand-primary)', padding: '0.5rem', borderRadius: '6px' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
              {language === 'hi' ? "साइबर सुरक्षा जागरूकता केंद्र" : "Digital Safety Learning Modules"}
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              {language === 'hi'
                ? "भारत में सक्रिय 8 प्रमुख साइबर ठगी के तरीकों को समझें, उनके रेड फ्लैग्स पहचानें और अपने परिवार को सुरक्षित रखें।"
                : "Comprehensive breakdown of the 8 most critical financial scam vectors targeting citizens."}
            </p>
          </div>
        </div>
      </div>

      {/* Grid of 8 Learning Modules */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {LEARNING_MODULES.map((mod) => {
          const isExpanded = expandedId === mod.id;

          return (
            <div
              key={mod.id}
              className="surface-card"
              style={{
                border: isExpanded ? '1px solid var(--color-brand-light)' : '1px solid var(--color-border-subtle)',
                transition: 'border-color 0.2s',
                padding: '1.25rem'
              }}
            >
              {/* Header row of module */}
              <div
                onClick={() => toggleExpand(mod.id)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span className="badge badge-info" style={{ fontSize: '0.6875rem' }}>
                      {mod.threatType}
                    </span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                      {mod.tagline}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-brand-primary)' }}>
                    {mod.title}
                  </h3>
                </div>

                <div style={{ color: 'var(--color-text-muted)', padding: '0.5rem' }}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Collapsed/Expanded Details */}
              {isExpanded && (
                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                    {mod.summary}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {/* How it works */}
                    <div style={{ background: 'var(--color-surface-subtle)', padding: '1rem', borderRadius: '6px' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.625rem' }}>
                        {language === 'hi' ? "ठगी कैसे काम करती है:" : "Modus Operandi (How It Works):"}
                      </h4>
                      <ol style={{ paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--color-text-main)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        {mod.howItWorks.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Red flags */}
                    <div style={{ background: 'var(--color-danger-bg)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--color-danger-border)' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-danger-text)', marginBottom: '0.625rem' }}>
                        {language === 'hi' ? "रेड फ्लैग्स (खतरे के संकेत):" : "Red Flags to Watch For:"}
                      </h4>
                      <ul style={{ listStyle: 'none', fontSize: '0.8125rem', color: 'var(--color-text-main)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        {mod.redFlags.map((rf, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                            <AlertCircle size={14} color="var(--color-danger-text)" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                            <span>{rf}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Safe Action Steps */}
                  <div style={{ background: 'var(--color-success-bg)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--color-success-border)' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-success-text)', marginBottom: '0.625rem' }}>
                      {language === 'hi' ? "सुरक्षित आदतें व बचाव के उपाय:" : "Prescribed Safety Habits:"}
                    </h4>
                    <ul style={{ listStyle: 'none', fontSize: '0.8125rem', color: 'var(--color-text-main)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {mod.safeActionSteps.map((hab, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem' }}>
                          <CheckCircle2 size={14} color="var(--color-success-text)" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                          <span>{hab}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Source reference footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ShieldCheck size={14} color="var(--color-brand-light)" />
                      <span>प्रमाणित स्रोत: {mod.officialSource}</span>
                    </div>
                    <a
                      href={mod.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-brand-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <span>आधिकारिक सर्कुलर देखें</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
