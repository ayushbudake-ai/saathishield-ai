import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, CheckCircle2, Award, Database, Layers } from 'lucide-react';
import { Language } from '../types';
import { DATASET_STATS } from '../data/content';

interface DashboardViewProps {
  language: Language;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ language }) => {
  const categoryBars = [
    { name: "UPI & Payment Fraud", count: 135, pct: "29.3%" },
    { name: "OTP & PIN Security", count: 95, pct: "20.7%" },
    { name: "Phishing & Fake KYC", count: 52, pct: "11.3%" },
    { name: "WhatsApp & Social Eng.", count: 49, pct: "10.7%" },
    { name: "Digital Arrest Coercion", count: 32, pct: "7.0%" },
    { name: "Remote APK Trojans", count: 33, pct: "7.2%" },
    { name: "Emergency 1930 Triage", count: 33, pct: "7.2%" },
    { name: "General Safety Rules", count: 31, pct: "6.7%" }
  ];

  const rubricDimensions = [
    { dimension: "Factual Accuracy & Authority", original: 4.10, enhanced: 4.80, gain: "+17.1%" },
    { dimension: "Actionability & Step Completeness", original: 3.40, enhanced: 4.70, gain: "+38.2%" },
    { dimension: "Linguistic Naturalness (Hindi/Hinglish)", original: 4.00, enhanced: 4.70, gain: "+17.5%" },
    { dimension: "Safety & Privacy Guardrails", original: 4.20, enhanced: 4.90, gain: "+16.7%" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '1.5rem 0' }}>
      {/* View Header */}
      <div className="surface-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--color-brand-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ background: 'var(--color-surface-tint)', color: 'var(--color-brand-primary)', padding: '0.5rem', borderRadius: '6px' }}>
            <BarChart3 size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
              {language === 'hi' ? "डेटासेट एवं मूल्यांकन डैशबोर्ड" : "Dataset & Empirical Evaluation Dashboard"}
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              {language === 'hi'
                ? "Hackyard x Adaption Dataset Challenge 2026 के वास्तविक, सत्यापित परिणाम एवं बेंचमार्क सांख्यिकी।"
                : "Audited dataset metrics, Adaption platform enhancement gains, and independent held-out benchmark results."}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div className="surface-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>प्रशिक्षण डेटासेट आकार</span>
            <Database size={18} color="var(--color-brand-light)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
            {DATASET_STATS.totalRecords}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            8 श्रेणियां • 3 भाषाएं (Hindi, Hinglish, English)
          </div>
        </div>

        <div className="surface-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Adaption प्लेटफॉर्म गेन</span>
            <TrendingUp size={18} color="var(--color-success-text)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success-text)' }}>
            {DATASET_STATS.relativeGainPct}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            5.8 (प्रारंभिक) ➔ 8.4 / 10 (Adaption संवर्धित)
          </div>
        </div>

        <div className="surface-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>हेल्ड-आउट टेस्ट सेट</span>
            <Layers size={18} color="var(--color-brand-light)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
            {DATASET_STATS.heldOutTestCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            105 अप्रशिक्षित (Unseen) कठिन परिदृश्य
          </div>
        </div>

        <div className="surface-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>कार्रवाई योग्य चरणों में वृद्धि</span>
            <Award size={18} color="var(--color-warning-text)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
            {DATASET_STATS.actionabilityGainPct}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            3.40 ➔ 4.70 / 5.0 (प्रक्रियात्मक चरण)
          </div>
        </div>
      </div>

      {/* Visual Comparison: Original vs Adaption Enhanced */}
      <section className="surface-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-brand-primary)', marginBottom: '1.25rem' }}>
          {language === 'hi' ? "Adaption प्लेटफॉर्म सुधार तुलना (Before vs After Quality)" : "Adaption Platform Quality Evaluation (Before vs After)"}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.375rem' }}>
              <span>प्रारंभिक बीज डेटासेट (Original Seed Dataset)</span>
              <strong>5.8 / 10 (58%)</strong>
            </div>
            <div style={{ height: '18px', background: 'var(--color-surface-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '58%', height: '100%', background: 'var(--color-border-strong)' }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.375rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-brand-primary)' }}>Adaption संवर्धित डेटासेट (Adaptive Data Quality)</span>
              <strong style={{ color: 'var(--color-success-text)' }}>8.4 / 10 (84%) • +44.8% Relative Improvement</strong>
            </div>
            <div style={{ height: '18px', background: 'var(--color-surface-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '84%', height: '100%', background: 'var(--color-brand-primary)' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Breakdown Bars */}
      <section className="surface-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-brand-primary)', marginBottom: '1.25rem' }}>
          {language === 'hi' ? "डेटासेट श्रेणी वितरण (Taxonomy Distribution)" : "Dataset Taxonomy & Category Allocation"}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {categoryBars.map((c, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 500 }}>{c.name}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{c.count} उदाहरण ({c.pct})</span>
              </div>
              <div style={{ height: '10px', background: 'var(--color-surface-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: c.pct, height: '100%', background: 'var(--color-brand-light)' }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rubric Evaluation Performance Table */}
      <section className="surface-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-brand-primary)', marginBottom: '1.25rem' }}>
          {language === 'hi' ? "105 हेल्ड-आउट टेस्ट परिदृश्यों पर 5-अक्षीय मूल्यांकन" : "5-Axis Empirical Scoring on 105 Held-out Test Prompts"}
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface-tint)', color: 'var(--color-brand-primary)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 1rem' }}>मूल्यांकन आयाम (Rubric Axis)</th>
                <th style={{ padding: '0.75rem 1rem' }}>प्रारंभिक स्कोर (1-5)</th>
                <th style={{ padding: '0.75rem 1rem' }}>संवर्धित स्कोर (1-5)</th>
                <th style={{ padding: '0.75rem 1rem' }}>सापेक्ष सुधार (Gain)</th>
              </tr>
            </thead>
            <tbody>
              {rubricDimensions.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{r.dimension}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-muted)' }}>{r.original.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--color-success-text)', fontWeight: 700 }}>{r.enhanced.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--color-brand-primary)', fontWeight: 600 }}>{r.gain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Automated Validation Log Card */}
      <section className="surface-card" style={{ padding: '1.5rem', background: 'var(--color-surface-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <CheckCircle2 color="var(--color-success-text)" size={18} />
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-brand-primary)' }}>
            डेटा गुणवत्ता नियंत्रण ऑडिट (Python Pipeline Verified)
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.8125rem' }}>
          <div>✓ स्कीमा अनुपालन: <strong>prompt,completion (100%)</strong></div>
          <div>✓ डुप्लीकेट पेयर्स: <strong>0 (Zero Duplicates)</strong></div>
          <div>✓ संवेदनशील डेटा रिसाव: <strong>0 (No real OTP/Cards)</strong></div>
          <div>✓ देवनागरी एन्कोडिंग: <strong>UTF-8 Validated</strong></div>
        </div>
      </section>
    </div>
  );
};
