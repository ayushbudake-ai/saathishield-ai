import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Check, ShieldCheck, ExternalLink, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
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
        ? "नमस्ते! मैं साथीशील्ड AI हूँ — आपका डिजिटल सुरक्षा साथी।\n\nआप मुझसे UPI भुगतान, बिजली बिल के संदिग्ध SMS, WhatsApp वीडियो कॉल, OTP सुरक्षा या ऑनलाइन धोखाधड़ी से जुड़ा कोई भी सवाल पूछ सकते हैं।\n\n(महत्वपूर्ण: कृपया अपना असली बैंक खाता नंबर, पासवर्ड या OTP यहाँ कभी न लिखें।)"
        : language === 'hi-en'
        ? "Namaste! Main SaathiShield AI hoon — aapka digital safety companion.\n\nAap mujhse UPI scams, electricity bill SMS, WhatsApp police video calls ya emergency fraud reporting se related koi bhi question pooch sakte hain.\n\n(Privacy Note: Apna real OTP, UPI PIN ya bank password yahan share na karein.)"
        : "Welcome to SaathiShield AI — your citizen digital safety assistant.\n\nYou can ask questions regarding UPI collect requests, electricity cutoff SMS, digital arrest threats, or emergency fraud reporting.\n\n(Privacy Notice: Never enter real passwords, account numbers, or OTPs.)",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceName: "SaathiShield Core Grounding Engine",
      isGrounded: true
    }
  ]);

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = SUGGESTED_PROMPTS[language] || SUGGESTED_PROMPTS['hi'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Check sensitive data entered by mistake
    if (/\b\d{4,6}\b/.test(query) && /otp|pin/i.test(query)) {
      // warning handled inside engine response
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateAssistantResponse(query, language);
      setMessages((prev) => [...prev, resp]);
      setIsTyping(false);
    }, 400);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: language === 'hi' 
          ? "बातचीत रीसेट कर दी गई है। आप अपना नया सवाल पूछ सकते हैं।"
          : "Conversation reset. You can ask your safety question now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceName: "SaathiShield Engine",
        isGrounded: true
      }
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', minHeight: '600px', gap: '1rem', padding: '1rem 0' }}>
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
            <div style={{ fontSize: '0.75rem', color: 'var(--color-success-text)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-success-text)' }}></span>
              {language === 'hi' ? "सत्यापित डेटासेट ग्राउंडेड मोड (100% नियामक सर्कुलर आधारित)" : "Verified Grounded Dataset Mode (Zero Hallucination)"}
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

      {/* Suggested Chips Bar */}
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
        {messages.map((m) => {
          const isUser = m.sender === 'user';
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
              <div
                style={{
                  maxWidth: isUser ? '80%' : '88%',
                  background: isUser ? 'var(--color-brand-primary)' : 'var(--color-surface-subtle)',
                  color: isUser ? '#FFFFFF' : 'var(--color-text-main)',
                  borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  padding: '1rem 1.25rem',
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  border: isUser ? 'none' : '1px solid var(--color-border-subtle)',
                  whiteSpace: 'pre-line',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                {m.text}
              </div>

              {/* Message metadata / Action bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.375rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
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

                    {m.sourceUrl && (
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
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
            <span style={{ animation: 'pulse 1s infinite' }}>● ● ●</span>
            <span>{language === 'hi' ? "सत्यापित नियमों की जांच की जा रही है..." : "Verifying against official guidelines..."}</span>
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
              : "Type your security question here (e.g., 'Do I need UPI PIN to receive money?')"
          }
          style={{ flex: 1, padding: '0.75rem 1rem' }}
        />
        <button
          type="submit"
          className="btn-primary"
          style={{ padding: '0.75rem 1.5rem' }}
          disabled={!input.trim()}
        >
          <Send size={18} />
          <span>{language === 'hi' ? "भेजें" : "Send"}</span>
        </button>
      </form>
    </div>
  );
};
