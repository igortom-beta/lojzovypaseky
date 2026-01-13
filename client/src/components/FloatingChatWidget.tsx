import React, { useState } from 'react';

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Dobrý den! 👋 Jsem asistent pro Lojzovy Paseky. Jak vám mohu pomoci s vaší rezervací?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Jsi asistent pro luxusní apartmány Lojzovy Paseky na Šumavě. Odpovídej profesionálně a mile v češtině.' },
            ...messages,
            userMsg
          ]
        } )
      });
      const data = await response.json();
      setMessages(prev => [...prev, data.choices[0].message]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Omlouvám se, zkuste to prosím za chvilku.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-[#22c55e] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform text-2xl">💬</button>
      ) : (
        <div className="bg-[#1a1a1a] w-80 h-[450px] rounded-2xl shadow-2xl flex flex-col border border-white/10 overflow-hidden text-white">
          <div className="bg-[#22c55e] p-4 flex justify-between items-center font-bold">
            <span>Lojzovy Paseky AI</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#22c55e]' : 'bg-white/10'}`}>{m.content}</div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-gray-500 animate-pulse">AI přemýšlí...</div>}
          </div>
          <div className="p-4 border-t border-white/10 bg-black/40 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Napište nám..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none" />
            <button onClick={sendMessage} className="bg-[#22c55e] px-3 py-2 rounded-lg font-bold">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};
