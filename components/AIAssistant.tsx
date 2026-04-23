'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'bot' | 'user';
  content: string;
  thinking?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'bot',
    content: "Namaste! 🙏 I'm CivicAI - your guide to India's democratic process. Ask me anything about elections, EVM technology, voter rights, or the 2024 Lok Sabha results!",
  },
];

const SUGGESTIONS = [
  'How does EVM security work?',
  'What is NOTA?',
  'Explain VVPAT',
  'Who is the Chief Election Commissioner?',
  'What happens in a hung parliament?',
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const msgEndRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Expose input ref via DOM id for "Ask AI" buttons in journey
  useEffect(() => {
    const el = inputRef.current;
    if (el) el.id = 'ai-input';
  }, []);

  useEffect(() => {
    if (open) {
      msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const sendMessage = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput('');

    const userMsg: Message = { role: 'user', content: msg };
    const thinkMsg: Message = { role: 'bot', content: '', thinking: true };
    const newMessages = [...messages, userMsg];
    setMessages([...newMessages, thinkMsg]);
    setLoading(true);
    if (!open) setOpen(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const contentType = res.headers.get('content-type') || '';
      let botContent: string;
      
      if (contentType.includes('text/event-stream')) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        botContent = '';
        
        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  botContent += parsed.text;
                  setMessages((prev) => {
                    const msgs = [...prev];
                    msgs[msgs.length - 1] = { role: 'bot', content: botContent };
                    return msgs;
                  });
                }
              } catch { /* ignore parse errors */ }
            }
          }
        }
      } else {
        const data = await res.json();
        botContent = res.ok && data.text ? data.text : 
          (data.error || "Sorry, I am facing an issue connecting to my democratic knowledge base.");
      }

      const botReply: Message = {
        role: 'bot',
        content: botContent,
      };

      if (!contentType.includes('text/event-stream')) {
        setMessages((prev) => [...prev.slice(0, -1), botReply]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'bot', content: "Network error occurred." }
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, open, messages]);

  // Listen for DOM-based "Ask AI" triggers
  useEffect(() => {
    function handler(e: Event) {
      const el = e.target as HTMLElement;
      if (el.classList.contains('ask-more-btn') || el.closest('.ask-more-btn')) {
        const inp = inputRef.current;
        if (inp && inp.value) {
          setOpen(true);
          sendMessage(inp.value);
          inp.value = '';
        }
      }
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [sendMessage]);

  return (
    <div className="ai-assistant" role="complementary" aria-label="AI Election Assistant">
      {/* Chat Panel */}
      {open && (
        <div
          id="ai-chat-panel"
          className="ai-chat-panel"
          role="dialog"
          aria-modal="false"
          aria-label="CivicAI chat"
        >
          {/* Header */}
          <div className="ai-header">
            <div className="ai-header-info">
              <span className="ai-avatar" aria-hidden="true">🏛️</span>
              <div>
                <strong className="ai-header-name">CivicAI Guide</strong>
                <span className="ai-powered">India Elections Expert</span>
              </div>
            </div>
            <button
              className="ai-close"
              onClick={() => setOpen(false)}
              aria-label="Close AI assistant"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            className="ai-messages"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`ai-message ${m.role === 'user' ? 'user-msg' : ''}`}
              >
                {m.role === 'bot' && (
                  <span className="msg-avatar" aria-hidden="true">🏛️</span>
                )}
                {m.thinking ? (
                  <div className="msg-bubble thinking-bubble" aria-label="AI is typing">
                    <div className="t-dot" />
                    <div className="t-dot" />
                    <div className="t-dot" />
                  </div>
                ) : (
                  <div
                    className="msg-bubble"
                    dangerouslySetInnerHTML={{
                      __html: m.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                )}
                {m.role === 'user' && (
                  <span className="msg-avatar" aria-hidden="true">👤</span>
                )}
              </div>
            ))}

            {/* Suggestions */}
            {messages.length <= 2 && !loading && (
              <div className="ai-suggestions" role="group" aria-label="Suggested questions">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    className="suggestion-pill"
                    onClick={() => sendMessage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={msgEndRef} />
          </div>

          {/* Input */}
          <div className="ai-input-wrap">
            <input
              ref={inputRef}
              type="text"
              className="ai-input"
              placeholder={process.env.NEXT_PUBLIC_API_READY === 'false' ? "Waiting for API Key..." : "Ask about Indian elections…"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !loading) sendMessage(); }}
              aria-label="Type your election question"
              disabled={loading}
            />
            <button
              className="ai-send"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
          <p className="ai-disclaimer">
            Powered by Google Gemini · Always verify with official ECI sources
          </p>
        </div>
      )}

      {/* Toggle Button */}
      <button
        className="ai-toggle-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open CivicAI assistant"
      >
        <span className="ai-btn-icon" aria-hidden="true">🏛️</span>
        CivicAI Guide
        <span className="ai-btn-pulse" aria-hidden="true" />
      </button>
    </div>
  );
}
