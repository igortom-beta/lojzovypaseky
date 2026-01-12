import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Streamdown } from 'streamdown';
import { trpc } from '@/lib/trpc';

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    },
    onError: (error) => {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Omlouvám se, došlo k chybě při spojení se serverem.' }]);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
    if (!SpeechRecognition) return alert('Váš prohlížeč nepodporuje rozpoznávání hlasu.');
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'cs-CZ';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => {
      setInputValue(prev => prev + ' ' + e.results[0][0].transcript);
    };
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMsg = inputValue.trim();
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setInputValue('');

    chatMutation.mutate({
      messages: newMessages as any,
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-6 right-6 z-50 bg-[#22c55e] hover:bg-[#1da850] text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[380px] h-[500px] flex flex-col bg-[#0a0f16] border-2 border-[#22c55e] z-50 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="bg-[#22c55e] text-white p-4 font-bold flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Lojzovy Paseky AI
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70"><X size={18} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0f16]">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10 text-sm">
                Dobrý den! Jsem váš asistent pro Lojzovy Paseky. 
                Zeptejte se mě na cokoliv ohledně ubytování nebo lokality.
              </div>
            )}
            {messages.map((msg: any, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#22c55e] text-white rounded-tr-none' 
                    : 'bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700'
                }`}>
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <Streamdown>{msg.content}</Streamdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-700">
                  <Loader2 className="w-4 h-4 animate-spin text-[#22c55e]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-[#0d141d] flex gap-2">
            <button 
              type="button" 
              onClick={toggleListening} 
              className={`p-2 rounded-lg transition-colors ${isListening ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              <Mic size={18} />
            </button>
            <Input 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="Napište zprávu..."
              className="flex-1 bg-gray-900 border-gray-700 text-white focus:border-[#22c55e] focus:ring-[#22c55e]"
              disabled={chatMutation.isPending}
            />
            <Button 
              type="submit" 
              disabled={!inputValue.trim() || chatMutation.isPending}
              className="bg-[#22c55e] hover:bg-[#1da850] text-white"
            >
              <Send size={18} />
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}
