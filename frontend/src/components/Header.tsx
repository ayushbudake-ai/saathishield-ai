import React from 'react';
import { Shield, PhoneCall, Globe, MessageSquare, AlertTriangle, BookOpen, BarChart3, Info, Home } from 'lucide-react';
import { Language, NavigationTab } from '../types';
import { UI_STRINGS } from '../data/content';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onSelectLanguage
}) => {
  const strings = UI_STRINGS[language];

  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'home', label: strings.navHome, icon: <Home size={16} /> },
    { tab: 'assistant', label: strings.navAssistant, icon: <MessageSquare size={16} /> },
    { tab: 'checker', label: strings.navChecker, icon: <AlertTriangle size={16} /> },
    { tab: 'emergency', label: strings.navEmergency, icon: <PhoneCall size={16} /> },
    { tab: 'learn', label: strings.navLearn, icon: <BookOpen size={16} /> },
    { tab: 'dashboard', label: strings.navDashboard, icon: <BarChart3 size={16} /> },
    { tab: 'about', label: strings.navAbout, icon: <Info size={16} /> }
  ];

  return (
    <header style={{ background: '#FFFFFF', borderBottom: '1px solid var(--color-border-subtle)', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top emergency announcement bar */}
      <div style={{ background: '#173F35', color: '#FFFFFF', padding: '0.375rem 1rem', fontSize: '0.8125rem' }}>
        <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-danger" style={{ fontSize: '0.6875rem', padding: '0.125rem 0.375rem' }}>राष्ट्रीय आपातकालीन सूचना</span>
            <span>{strings.disclaimerBanner}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a href="tel:1930" style={{ color: '#FCE0A6', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <PhoneCall size={13} /> {strings.dialEmergency}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Brand identity */}
        <div 
          onClick={() => onSelectTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{ 
            background: 'var(--color-brand-primary)', 
            color: '#FFFFFF', 
            width: '40px', 
            height: '40px', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(23, 63, 53, 0.15)'
          }}>
            <Shield size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-brand-primary)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              {strings.brandName}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              {strings.tagline}
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                  background: isActive ? 'var(--color-surface-tint)' : 'transparent',
                  border: isActive ? '1px solid #CBDCD2' : '1px solid transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Language selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
            <Globe size={15} />
          </div>
          <select
            value={language}
            onChange={(e) => onSelectLanguage(e.target.value as Language)}
            style={{
              padding: '0.375rem 0.625rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              background: '#FFFFFF',
              borderColor: 'var(--color-border-strong)',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <option value="hi">हिन्दी (Devanagari)</option>
            <option value="hi-en">Hinglish (Roman)</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </header>
  );
};
