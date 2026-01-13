import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Mic, Loader2 } from 'lucide-react';
import { trpc } from '../utils/trpc';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Dobrý den! Jsem váš asistent pro Lojzovy Paseky. Jak vám mohu pomoci?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Toto je to klíčové propojení na váš server
  const chatMutation = trpc.chat.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Voláme váš server, ne přímo OpenAI
      const response = await chatMutation.mutateAsync({
        messages: [...messages, userMessage].map(m => ({
          role: m.role,
          content: m.content
        }))
      });

      if (response && response.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.content }]);
      } else {
        throw new Error('Neplatná odpověď od asistenta');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Omlouvám se, ale došlo k chybě při spojení se serverem. Zkuste to prosím později.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Zde by byla logika pro nahrávání hlasu
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-gray-800 w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Hlavička */}
          <div className="bg-green-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span className="font-semibold">Lojzovy Paseky AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Zprávy */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-green-600 text-white rounded-tr-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl rounded-tl-none">
                  <Loader2 className="animate-spin text-green-600" size={20} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Vstupní pole */}
          <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Zeptejte se na cokoliv..."
                className="flex-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 dark:text-white"
              />
              <button
                onClick={toggleRecording}
                className={`p-2 rounded-xl transition-colors ${
                  isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <Mic size={20} />
              </button>
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white p-2 rounded-xl transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
