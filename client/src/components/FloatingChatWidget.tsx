import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Mic, MicOff, Loader2 } from 'lucide-react';
// Změněno z '../utils/trpc' na '../lib/trpc' pro úspěšný build na Vercelu
import { trpc } from '../lib/trpc';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Dobrý den! Jsem váš asistent pro Lojzovy Paseky. Jak vám mohu pomoci?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Omlouvám se, došlo k chybě při spojení se serverem.' }]);
      setIsLoading(false);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    chatMutation.mutate({
      messages: [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }))
    });
  };

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
    if (isListening) recognition.stop(); else recognition.start();
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 bg-[#22c55e] text-white p-4 rounded-full shadow-lg hover:bg-[#16a34a] transition-colors">
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-24px)] h-[500px] flex flex-col bg-white border-2 border-[#22c55e] shadow-2xl rounded-2xl z-50 overflow-hidden">
          <div className="bg-[#22c55e] text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Lojzovy Paseky AI</h3>
              <p className="text-sm opacity-90">Online | Připraven pomoci</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className
