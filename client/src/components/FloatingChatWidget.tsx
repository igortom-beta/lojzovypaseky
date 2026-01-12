import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Streamdown } from 'streamdown';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
    if (!SpeechRecognition) {
      alert('Váš prohlížeč nepodporuje diktování hlasem.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'cs-CZ';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(prev => prev + ' ' + transcript);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const systemPrompt = `Jsi asistent pro projekt Lojzovy Paseky na Lipně. Cena nájmu: 24 000 Kč/měsíc. Kontakt: info@lojzovypaseky.life. Odpovídej stručně a profesionálně.`;
      // VLOŽENÝ KLÍČ NATVRDO PRO OKAMŽITOU FUNKČNOST
      const apiKey = "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";
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: 'system', content: systemPrompt }, ...newMessages],
          temperature: 0.7
        } )
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Omlouvám se, došlo k chybě připojení k AI.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-32 right-6 z-40">
        <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 px-6 rounded-lg shadow-lg" onClick={() => window.location.href = 'mailto:info@lojzovypaseky.life'}>REZERVOVAT TEĎ</Button>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 bg-[#22c55e] text-white p-4 rounded-full shadow-lg hover:bg-[#16a34a] transition-colors">{isOpen ? <X size={24} /> : <MessageCircle size={24} />}</button>
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-24px)] h-[500px] flex flex-col bg-white border-2 border-[#22c55e] shadow-2xl rounded-lg z-50 overflow-hidden">
          <div className="bg-[#22c55e] text-white p-4"><h3 className="font-bold text-lg">Lojzovy Paseky AI</h3><p className="text-sm opacity-90">Online | Připraven pomoci</p></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && <div className="text-center text-gray-500 mt-8"><p className="text-sm">Vítejte! Jak vám mohu pomoci?</p></div>}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-[#1a3a5f] text-white' : 'bg-white text-gray-800 border border-gray-200'}`}>
                  {msg.role === 'assistant' ? <Streamdown>{msg.content}</Streamdown> : <p className="text-sm">{msg.content}</p>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="border-t border-gray-100 p-4 bg-white flex gap-2 items-center">
            <Button type="button" onClick={toggleListening} className={`p-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-200 text-gray-600'}`}>
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </Button>
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Napište nebo diktujte..." className="flex-1" disabled={isLoading} />
            <Button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-[#22c55e] hover:bg-[#16a34a] text-white"><Send size={18} /></Button>
          </form>
        </Card>
      )}
    </>
  );
}
