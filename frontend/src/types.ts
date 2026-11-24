export type Language = 'hi' | 'hi-en' | 'en';

export type NavigationTab = 
  | 'home' 
  | 'assistant' 
  | 'checker' 
  | 'emergency' 
  | 'learn' 
  | 'dashboard' 
  | 'about';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: string;
  sourceId?: string;
  sourceUrl?: string;
  sourceName?: string;
  verifiedDate?: string;
  isGrounded?: boolean;
  detectedLanguage?: string;
  detectedIntent?: string;
  riskLevel?: 'emergency' | 'high' | 'moderate' | 'informational';
  responseMode?: 'live_ai' | 'retrieval_only' | 'retrieval_enhanced' | 'emergency' | 'offline_fallback' | 'demo';
  suggestedFollowups?: string[];
  recommendedActions?: string[];
  sourcesList?: { name: string; url: string; authority?: string }[];
  retrievalRelevance?: number;
  confidence?: number;
}

export interface ScamCheckResult {
  riskLevel: 'high' | 'suspicious' | 'low';
  riskScore: number; // 0 to 100
  title: string;
  redFlagsDetected: string[];
  explanation: string;
  immediateActions: string[];
  officialHelpline: string;
  warningNote: string;
}

export interface LearningModule {
  id: string;
  title: string;
  tagline: string;
  threatType: string;
  summary: string;
  howItWorks: string[];
  redFlags: string[];
  safeActionSteps: string[];
  officialSource: string;
  sourceUrl: string;
}

export interface BankHelpline {
  bankName: string;
  emergencyFraudNumber: string;
  cardBlockSMS: string;
  officialApp: string;
  website: string;
}

export interface DatasetStatistics {
  totalRecords: number;
  categoriesCount: number;
  languagesCount: number;
  baselineQualityScore: number;
  enhancedQualityScore: number;
  relativeGainPct: string;
  heldOutTestCount: number;
  heldOutBaselineScore: number;
  heldOutEnhancedScore: number;
  actionabilityGainPct: string;
  lastValidationDate: string;
}
