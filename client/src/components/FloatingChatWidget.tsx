import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Streamdown } from 'streamdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState('cs');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.ai.chat.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect language from user input - supports 7 languages
  const detectLanguage = (text: string): string => {
    const languageKeywords: Record<string, string[]> = {
      cs: ['ahoj', 'jak', 'co', 'kde', 'kdy', 'proč', 'cena', 'nájem', 'bungalov', 'pronájem', 'rezervace', 'kolik', 'stojí', 'měsíc'],
      de: ['wie', 'was', 'wo', 'wann', 'warum', 'bungalow', 'miete', 'preis', 'kosten', 'monat', 'reservierung', 'buchung'],
      en: ['how', 'what', 'where', 'when', 'why', 'bungalow', 'rent', 'price', 'cost', 'month', 'booking', 'reservation'],
      hr: ['kako', 'što', 'gdje', 'kada', 'zašto', 'bungalov', 'cijena', 'najam', 'rezervacija', 'koliko', 'mjesec'],
      it: ['come', 'cosa', 'dove', 'quando', 'perché', 'bungalow', 'prezzo', 'affitto', 'costo', 'mese', 'prenotazione', 'quanto'],
      fr: ['comment', 'quoi', 'où', 'quand', 'pourquoi', 'bungalow', 'prix', 'loyer', 'coût', 'mois', 'réservation', 'combien'],
      es: ['cómo', 'qué', 'dónde', 'cuándo', 'por qué', 'bungalow', 'precio', 'alquiler', 'costo', 'mes', 'reserva', 'cuánto'],
    };
    
    const lowerText = text.toLowerCase();
    const scores: Record<string, number> = { cs: 0, de: 0, en: 0, hr: 0, it: 0, fr: 0, es: 0 };

    Object.entries(languageKeywords).forEach(([lang, words]) => {
      words.forEach(word => {
        if (lowerText.includes(word)) scores[lang]++;
      });
    });

    const maxScore = Math.max(...Object.values(scores));
    if (maxScore > 0) {
      return Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore) || 'cs';
    }

    // Default to Czech
    return 'cs';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    const language = detectLanguage(userMessage);
    setDetectedLanguage(language);
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatMutation.mutateAsync({
        messages: [
          ...messages,
          { role: 'user', content: userMessage },
        ],
        language,
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessages: Record<string, string> = {
        cs: 'Omlouvám se, došlo k chybě. Prosím zkuste to znovu.',
        de: 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        en: 'Sorry, an error occurred. Please try again.',
        hr: 'Izvinjavam se, došlo je do greške. Molim pokušajte ponovno.',
        it: 'Mi scusi, si è verificato un errore. Per favore riprova.',
        fr: 'Désolé, une erreur est survenue. Veuillez réessayer.',
        es: 'Lo siento, ocurrió un error. Por favor, inténtelo de nuevo.',
      };
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessages[detectedLanguage] || errorMessages.cs
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getWelcomeMessage = (): string => {
    const messages: Record<string, string> = {
      cs: 'Vítejte v Lojzových Pasekách! 👋 Jak vám mohu pomoci?',
      de: 'Willkommen in Lojzovy Paseky! 👋 Wie kann ich dir helfen?',
      en: 'Welcome to Lojzovy Paseky! 👋 How can I help you?',
      hr: 'Dobrodošli u Lojzove Paseky! 👋 Kako ti mogu pomoći?',
      it: 'Benvenuti a Lojzovy Paseky! 👋 Come posso aiutarti?',
      fr: 'Bienvenue à Lojzovy Paseky! 👋 Comment puis-je vous aider?',
      es: '¡Bienvenido a Lojzovy Paseky! 👋 ¿Cómo puedo ayudarte?',
    };
    return messages[detectedLanguage] || messages.cs;
  };

  return (
    <>
      {/* Booking Button */}
      <div className="fixed bottom-32 right-6 z-40">
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          onClick={() => window.location.href = 'mailto:info@lojzovypaseky.life?subject=Rezervace'}
        >
          REZERVOVAT TEĎ
        </Button>
      </div>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#1a3a5f] text-white p-4 rounded-full shadow-lg hover:bg-[#0f2540] transition-colors"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-24px)] h-96 max-h-[calc(100vh-200px)] flex flex-col bg-white border-2 border-[#1a3a5f] shadow-2xl rounded-lg z-50">
          {/* Header */}
          <div className="bg-[#1a3a5f] text-white p-4 rounded-t-lg">
            <h3 className="font-bold text-lg">Lojzovy Paseky Assistant</h3>
            <p className="text-sm text-gray-200">Modern bungalows at Lipno</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-sm">{getWelcomeMessage()}</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-[#1a3a5f] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-[#1a3a5f] rounded-bl-none'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <Streamdown>{msg.content}</Streamdown>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-[#1a3a5f] px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#1a3a5f] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#1a3a5f] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#1a3a5f] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-[#1a3a5f] p-4 bg-white rounded-b-lg flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border-[#1a3a5f] focus:border-[#1a3a5f] focus:ring-[#1a3a5f]"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-[#1a3a5f] hover:bg-[#0f2540] text-white"
            >
              <Send size={18} />
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}
