import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Trash2, Square } from 'lucide-react';
import './ClimateChat.css';

export default function ClimateChat({ state, location, hazardEvent = null }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(null), input = useRef(null), bottom = useRef(null), launcher = useRef(null);
  const contextLabel = `${location ? `${location.name} / ` : ''}${state?.name || 'India'}${hazardEvent ? ` · ${hazardEvent.title}` : ''}`;
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  useEffect(() => { if (open) bottom.current?.scrollIntoView({ block: 'nearest' }); }, [messages, busy, open]);
  const close = () => { setOpen(false); launcher.current?.focus(); };
  async function send(text = draft) {
    if (!text.trim() || busy || request.current) return;
    const question = text.trim();
    const history = [...messages.slice(-10), { role: 'user', content: question, context: contextLabel }];
    setMessages(history); setDraft(''); setError(''); setBusy(true);
    const controller = new AbortController(); request.current = controller;
    const timer = setTimeout(() => controller.abort(), 60000);
    try {
      const response = await fetch(`${import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1'}/chat/completions`, { 
        method: 'POST', 
        signal: controller.signal,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
          'X-Title': 'ClimateGuard AI'
        },
        body: JSON.stringify({ 
          model: import.meta.env.VITE_OPENAI_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b:free',
          max_tokens: 1000,
          messages: [
            { role: 'system', content: 'You are ClimateGuard AI, an expert disaster management and preparedness assistant. You analyze environmental data and provide concise, actionable safety advice.' },
            ...history.map(({ role, content, context }) => ({ role, content: role === 'user' ? `[Map selection: ${context}]\n${content}` : content.slice(0, 4000) }))
          ]
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Chat request failed.');
      const replyContent = data.choices?.[0]?.message?.content || data.choices?.[0]?.message?.reasoning || 'No reply generated.';
      setMessages(previous => [...previous, { role: 'assistant', content: replyContent }]);
    } catch (cause) {
      setError(cause.name === 'AbortError' ? 'Reply stopped or timed out. You can resend your question.' : cause.message);
      setMessages(previous => previous.slice(0, -1)); setDraft(question);
    } finally { clearTimeout(timer); request.current = null; setBusy(false); }
  }
  return <div className="climate-chat">
    {open && <section className="climate-chat-panel" role="region" aria-label="ClimateGuard AI chat" onKeyDown={event => { if (event.key === 'Escape') close(); }}>
      <header><div><strong>Ask ClimateGuard</strong><small>AI preparedness assistant</small></div><button type="button" onClick={close} aria-label="Close chat"><X size={19} /></button></header>
      <div className="climate-chat-context">Map context: {contextLabel || 'India'}</div>
      <p className="climate-chat-notice">Explains selected source data and preparedness only. It cannot verify reports, operate the response queue, predict disasters, or contact emergency services. Avoid personal details.</p>
      <div className="climate-chat-log" role="log" aria-live="polite" aria-busy={busy}>
        {!messages.length && <div className="climate-chat-welcome"><h3>What would you like to understand?</h3><p>Ask about preparedness, the map, or a selected live signal. I cannot verify that you are in danger.</p>{['Explain the selected signal', 'Help me prepare an emergency kit', 'How should I check official alerts?'].map(text => <button type="button" key={text} disabled={busy} onClick={() => send(text)}>{text}</button>)}</div>}
        {messages.map((message, index) => <div key={index} className={`climate-chat-message ${message.role}`}><small>{message.role === 'user' ? `You · ${message.context}` : 'ClimateGuard · AI'}</small><p>{message.content}</p></div>)}
        {busy && <p role="status">Preparing a reply…</p>}<div ref={bottom} />
      </div>
      {error && <p className="climate-chat-error" role="alert">{error}</p>}
      <form onSubmit={event => { event.preventDefault(); send(); }}>
        <label htmlFor="climate-chat-input" className="climate-chat-label">Your question</label>
        <textarea id="climate-chat-input" ref={input} value={draft} maxLength={3500} rows={2} disabled={busy} onChange={event => setDraft(event.target.value)} placeholder="Ask a question…" onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(); } }} />
        <div className="climate-chat-actions"><button type="button" disabled={busy || !messages.length} onClick={() => { setMessages([]); setError(''); }}><Trash2 size={15} /> New chat</button>{busy ? <button type="button" onClick={() => request.current?.abort()}><Square size={14} /> Stop</button> : <button className="climate-chat-send" type="submit" disabled={!draft.trim()}><Send size={15} /> Send</button>}</div>
      </form>
    </section>}
    <button type="button" className="climate-chat-launcher" ref={launcher} aria-expanded={open} onClick={() => open ? close() : setOpen(true)}><MessageCircle size={20} /> {open ? 'Hide assistant' : 'Ask ClimateGuard'}</button>
  </div>;
}
