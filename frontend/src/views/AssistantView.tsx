import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Check, ShieldCheck, ExternalLink, AlertTriangle, Sparkles, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { SUGGESTED_PROMPTS } from '../data/content';
import { generateAssistantResponse } from '../utils/engine';

interface AssistantViewProps {
  language: Language;
}

export const AssistantView: React.FC<AssistantViewProps> = ({ language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: language === 'hi'
        ? "नमस्ते! मैं साथीशील्ड AI हूँ — आपका नागरिक डिजिटल सुरक्षा और साइबर अपराध सहायता साथी।\n\nआप मुझसे UPI भुगतान, बिजली बिल के संदिग्ध SMS, WhatsApp वीडियो कॉल, 'डिजिटल अरेस्ट' धमकी, अनधिकृत पैसे कटने या OTP सुरक्षा से जुड़ा कोई भी सवाल पूछ सकते हैं।\n\n(महत्वपूर्ण: कृपया अपना असली बैंक पासवर्ड, कार्ड CVV या OTP यहाँ कभी न लिखें।)"
        : language === 'hi-en'
        ? "Namaste! Main SaathiShield AI hoon — aapka citizen digital safety companion.\n\nAap mujhse UPI scams, electricity bill SMS, WhatsApp police video calls ya emergency fraud reporting se related koi bhi question pooch sakte hain.\n\n(Privacy Note: Apna real OTP, UPI PIN ya bank password yahan share na karein.)"
        : "Welcome to SaathiShield AI — your citizen digital safety and fraud triage companion.\n\nYou can ask questions regarding UPI collect requests, electricity cutoff SMS, digital arrest extortion threats, or emergency fraud reporting.\n\n(Privacy Notice: Never enter real passwords, account numbers, or OTPs.)",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceName: "SaathiShield Core Grounding Engine",
      isGrounded: true,
      responseMode: 'retrieval_enhanced',
      suggestedFollowups: language === 'hi'
        ? ["क्या पैसे पाने के लिए UPI PIN जरूरी है?", "मेरे खाते से पैसे कट गए, क्या करूं?", "बिजली बिल कटने का SMS आया है"]
        : language === 'hi-en'
        ? ["Kya paise receive karne ke liye PIN chahiye?", "Account se paise cut gaye, kya karein?", "Electricity bill cutoff SMS real hai?"]
        : ["Do I need UPI PIN to receive money?", "Money was debited without consent", "Fake electricity disconnection SMS"]
    }
  ]);

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = SUGGESTED_PROMPTS[language] || SUGGESTED_PROMPTS['hi'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    setLastError(null);
    setLastFailedPrompt(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    setInput('');
    setIsTyping(true);

    try {
      const resp = await generateAssistantResponse(query, language, currentHistory);
      setMessages((prev) => [...prev, resp]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setLastError(err.message || (language === 'hi' ? "संदेश भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।" : "Failed to process message. Please retry."));
      setLastFailedPrompt(query);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRetry = async () => {
    if (!lastFailedPrompt) return;
    const query = lastFailedPrompt;
    setLastError(null);
    setIsTyping(true);

    try {
      // Re-invoke using current conversation messages without duplicating the user message in history
      const resp = await generateAssistantResponse(query, language, messages);
      setMessages((prev) => [...prev, resp]);
      setLastFailedPrompt(null);
    } catch (err: any) {
      console.error("Chat retry error:", err);
      setLastError(err.message || (language === 'hi' ? "पुनः प्रयास विफल रहा। कृपया पुनः प्रयास करें।" : "Retry failed. Please try again."));
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setLastError(null);
    setLastFailedPrompt(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: language === 'hi' 
          ? "बातचीत रीसेट कर दी गई है। आप अपना नया सवाल पूछ सकते हैं।"
          : "Conversation reset. You can ask your safety question now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceName: "SaathiShield Engine",
        isGrounded: true,
        responseMode: 'retrieval_enhanced'
      }
    ]);
  };

  const renderModeBadge = (mode?: string, risk?: string) => {
    if (risk === 'emergency' || mode === 'emergency') {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.7rem',
          fontWeight: 700,
          background: 'rgba(217, 45, 32, 0.1)',
          color: 'var(--color-danger-text)',
          border: '1px solid rgba(217, 45, 32, 0.3)',
          borderRadius: '4px',
          padding: '0.125rem 0.375rem',
          letterSpacing: '0.02em'
        }}>
          🚨 {language === 'hi' ? "आपातकालीन प्राथमिकता (1930)" : "EMERGENCY TRIAGE"}
        </span>
      );
    }

    if (mode === 'live_ai') {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.7rem',
          fontWeight: 600,
          background: 'rgba(23, 63, 53, 0.08)',
          color: 'var(--color-brand-primary)',
          border: '1px solid rgba(23, 63, 53, 0.2)',
          borderRadius: '4px',
          padding: '0.125rem 0.375rem'
        }}>
          ⚡ {language === 'hi' ? "लाइव AI मॉडल" : "Live AI Model"}
        </span>
      );
    }

    if (mode === 'offline_fallback') {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.7rem',
          fontWeight: 600,
          background: 'rgba(180, 107, 24, 0.1)',
          color: '#B46B18',
          border: '1px solid rgba(180, 107, 24, 0.3)',
          borderRadius: '4px',
          padding: '0.125rem 0.375rem'
        }}>
          ⚠️ {language === 'hi' ? "ऑफलाइन सुरक्षा बैकअप" : "Offline Knowledge Mode"}
        </span>
      );
    }

    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.7rem',
        fontWeight: 600,
        background: 'rgba(2, 122, 72, 0.08)',
        color: 'var(--color-success-text)',
        border: '1px solid rgba(2, 122, 72, 0.2)',
        borderRadius: '4px',
        padding: '0.125rem 0.375rem'
      }}>
        📖 {language === 'hi' ? "सीमित ज्ञानकोश (RAG)" : "Limited Knowledge (RAG)"}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', minHeight: '600px', gap: '0.875rem', padding: '0.75rem 0' }}>
      {/* Assistant Header Status */}
      <div className="surface-card" style={{ padding: '0.875rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--color-brand-primary)', color: '#FFFFFF', padding: '0.5rem', borderRadius: '6px' }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-brand-primary)' }}>
              {language === 'hi' ? "साथीशील्ड सुरक्षा सहायक" : "SaathiShield Safety Assistant"}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-success-text)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-success-text)' }}></span>
              {language === 'hi' ? "हाइब्रिड AI आर्किटेक्चर (सत्यापित 460+ डेटासेट + आपातकालीन 1930 चैनल)" : "Hybrid AI Architecture (460+ Grounded Pairs + 1930 Fast-Path)"}
            </div>
          </div>
        </div>

        <button 
          onClick={handleClear}
          className="btn-secondary"
          style={{ fontSize: '0.8125rem', padding: '0.375rem 0.75rem' }}
          title="Reset conversation"
        >
          <RefreshCw size={13} /> {language === 'hi' ? "नई बातचीत" : "New Chat"}
        </button>
      </div>

      {/* Suggested Starter Chips */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', whiteSpace: 'nowrap' }}>
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(s)}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border-strong)',
              borderRadius: '9999px',
              padding: '0.375rem 0.875rem',
              fontSize: '0.8125rem',
              color: 'var(--color-brand-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              transition: 'all 0.15s ease'
            }}
          >
            <Sparkles size={12} color="var(--color-brand-light)" />
            <span>{s}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Scroll Container */}
      <div className="surface-card" style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {messages.map((m, index) => {
          const isUser = m.sender === 'user';
          const isLatest = index === messages.length - 1;

          return (
            <div
              key={m.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                width: '100%'
              }}
            >
              {/* Response Mode / Attribution pill for assistant */}
              {!isUser && (
                <div style={{ marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {renderModeBadge(m.responseMode, m.riskLevel)}
                  {m.detectedIntent && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>
                      • {m.detectedIntent.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>
              )}

              {/* Message Bubble */}
              <div
                style={{
                  maxWidth: isUser ? '80%' : '90%',
                  background: isUser 
                    ? 'var(--color-brand-primary)' 
                    : (m.riskLevel === 'emergency' ? '#FFF5F5' : 'var(--color-surface-subtle)'),
                  color: isUser ? '#FFFFFF' : 'var(--color-text-main)',
                  borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  padding: '1rem 1.25rem',
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  border: isUser 
                    ? 'none' 
                    : (m.riskLevel === 'emergency' ? '1px solid rgba(217, 45, 32, 0.3)' : '1px solid var(--color-border-subtle)'),
                  whiteSpace: 'pre-line',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                {m.text}

                {/* Recommended Actions Pills */}
                {!isUser && m.recommendedActions && m.recommendedActions.length > 0 && (
                  <div style={{ marginTop: '0.875rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--color-border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '0.375rem' }}>
                      {language === 'hi' ? "तत्काल अनुशंसित कदम:" : "Immediate Recommended Steps:"}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {m.recommendedActions.map((act, actIdx) => (
                        <span
                          key={actIdx}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid var(--color-border-strong)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            color: 'var(--color-text-main)'
                          }}
                        >
                          ✓ {act}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Message metadata / Action bar */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.375rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <span>{m.timestamp}</span>
                {!isUser && (
                  <>
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: copiedId === m.id ? 'var(--color-success-text)' : 'var(--color-text-muted)',
                        fontSize: '0.75rem'
                      }}
                    >
                      {copiedId === m.id ? <Check size={12} /> : <Copy size={12} />}
                      {copiedId === m.id ? (language === 'hi' ? "कॉपी हो गया" : "Copied") : (language === 'hi' ? "कॉपी करें" : "Copy")}
                    </button>

                    {/* Sources list */}
                    {m.sourcesList && m.sourcesList.length > 0 ? (
                      m.sourcesList.map((s, sIdx) => (
                        <a
                          key={sIdx}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: 'var(--color-brand-light)',
                            textDecoration: 'none'
                          }}
                        >
                          <span>{s.name}</span>
                          <ExternalLink size={10} />
                        </a>
                      ))
                    ) : m.sourceUrl ? (
                      <a
                        href={m.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          color: 'var(--color-brand-light)',
                          textDecoration: 'none'
                        }}
                      >
                        <span>{m.sourceName || "Official Source"}</span>
                        <ExternalLink size={10} />
                      </a>
                    ) : null}
                  </>
                )}
              </div>

              {/* Dynamic Suggested Follow-ups Chips under latest assistant message */}
              {!isUser && isLatest && m.suggestedFollowups && m.suggestedFollowups.length > 0 && (
                <div style={{ marginTop: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%', maxWidth: '90%' }}>
                  <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    {language === 'hi' ? "संबंधित प्रश्न पूछें:" : "Related follow-ups:"}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {m.suggestedFollowups.map((fUp, fIdx) => (
                      <button
                        key={fIdx}
                        onClick={() => handleSend(fUp)}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid var(--color-border-subtle)',
                          borderRadius: '16px',
                          padding: '0.3rem 0.75rem',
                          fontSize: '0.75rem',
                          color: 'var(--color-brand-primary)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          textAlign: 'left'
                        }}
                      >
                        <span>{fUp}</span>
                        <ArrowRight size={10} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brand-primary)', fontSize: '0.8125rem' }}>
            <span style={{ animation: 'pulse 1s infinite' }}>● ● ●</span>
            <span>{language === 'hi' ? "सत्यापित नियमों व AI सुरक्षा इंजन से जांच की जा रही है..." : "Analyzing with grounded safety rules & AI..."}</span>
          </div>
        )}

        {lastError && (
          <div style={{
            background: '#FEF3F2',
            border: '1px solid #FECDCA',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-danger-text)', fontSize: '0.8125rem' }}>
              <AlertCircle size={16} />
              <span>{lastError}</span>
            </div>
            <button
              onClick={handleRetry}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.625rem' }}
            >
              {language === 'hi' ? "पुनः प्रयास करें" : "Retry"}
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{ display: 'flex', gap: '0.5rem' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            language === 'hi' 
              ? "अपना सुरक्षा सवाल यहाँ टाइप करें (उदा. 'क्या पैसे पाने के लिए PIN लगता है?')"
              : language === 'hi-en'
              ? "Apna security sawal yahan type karein (e.g. 'Mere account se paise cut gaye')"
              : "Type your security question here (e.g., 'Do I need UPI PIN to receive money?')"
          }
          style={{ flex: 1, padding: '0.75rem 1rem' }}
          disabled={isTyping}
        />
        <button
          type="submit"
          className="btn-primary"
          style={{ padding: '0.75rem 1.5rem' }}
          disabled={!input.trim() || isTyping}
        >
          <Send size={18} />
          <span>{language === 'hi' ? "भेजें" : "Send"}</span>
        </button>
      </form>
    </div>
  );
};
