import React, { useState } from 'react';
import { Language, NavigationTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AssistantView } from './views/AssistantView';
import { ScamCheckerView } from './views/ScamCheckerView';
import { EmergencyView } from './views/EmergencyView';
import { LearnView } from './views/LearnView';
import { DashboardView } from './views/DashboardView';
import { AboutView } from './views/AboutView';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [language, setLanguage] = useState<Language>('hi');

  const renderView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView language={language} onNavigate={(tab) => setCurrentTab(tab)} />;
      case 'assistant':
        return <AssistantView language={language} />;
      case 'checker':
        return <ScamCheckerView language={language} />;
      case 'emergency':
        return <EmergencyView language={language} />;
      case 'learn':
        return <LearnView language={language} />;
      case 'dashboard':
        return <DashboardView language={language} />;
      case 'about':
        return <AboutView language={language} />;
      default:
        return <HomeView language={language} onNavigate={(tab) => setCurrentTab(tab)} />;
    }
  };

  return (
    <div className={`app-root lang-${language}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onSelectLanguage={setLanguage}
      />
      <main className="app-container" style={{ flex: 1 }}>
        {renderView()}
      </main>
      <Footer language={language} />
    </div>
  );
}

export default App;
