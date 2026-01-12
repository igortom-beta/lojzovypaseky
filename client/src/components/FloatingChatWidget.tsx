import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
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
  const [detectedLanguage, setDetectedLanguage] = useState('cs');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    return maxScore > 0 ? Object.keys(scores).find(key => scores[key] === maxScore) || 'cs' : 'cs';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    const language = detectLanguage(userMessage);
    setDetectedLanguage(language);
    
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // System prompt with all the "smart" information
      const systemPrompt = `You are a friendly and professional assistant for renting modern bungalows in Lojzovy Paseky, Lipno.
      
      Property Information:
      - Location: Lojzovy Paseky, Lipno nad Vltavou, Czech Republic.
      - Type: Modern bungalows with large glass walls and nature views.
      - Rental: Long-term (monthly) and short-term available.
      - Target audience: Families, digital nomads, investors.
      
      Pricing:
      - Base rent: 24,000 CZK/month.
      - Security deposit: 2 months rent (48,000 CZK).
      - Utilities: Included in the price or specified upon request.
      - Exchange rate: Use approx 25 CZK = 1 EUR if not specified.
      
      Instructions:
      1. Communicate in the user's language (Czech, German, English, Croatian, Italian, French, Spanish).
      2. Be professional, friendly, and sales-oriented.
      3. Offer booking via email: info@lojzovypaseky.life.
      4. If asked about viewing, suggest contacting the owner via email.`;

      // Direct call to OpenAI API (using the key from environment variables via Vite)
      // Note: In a production environment, it's better to use a proxy, but for this specific setup, 
      // we'll use the key provided in the environment.
      const apiKey = (import.meta as any).env.VITE_OPENAI_API_KEY || (import.meta as any).env.OPENAI_API_KEY || (window as any).VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: 'system', content: systemPrompt },
            ...newMessages
          ],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to fetch from OpenAI");
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessages: Record<string, string> = {
        cs: 'Omlouvám se, došlo k chybě. Zkontrolujte prosím nastavení API klíče na Vercelu.',
        en: 'Sorry, an error occurred. Please check the API key settings on Vercel.',
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
      cs: 'Vítejte v Lojzových Pasekách! 👋 Jsem váš chytrý asistent. Jak vám mohu pomoci?',
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
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          onClick={() => window.location.href = 'mailto:info@lojzovypaseky.life?subject=Rezervace'}
        >
          REZERVOVAT TEĎ
        </Button>
      </div>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#22c55e] text-white p-4 rounded-full shadow-lg hover:bg-[#16a34a] transition-colors"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-24px)] h-[500px] max-h-[calc(100vh-200px)] flex flex-col bg-white border-2 border-[#22c55e] shadow-2xl rounded-lg z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-[#22c55e] text-white p-4">
            <h3 className="font-bold text-lg">Lojzovy Paseky AI</h3>
            <p className="text-sm opacity-90">Online | Připraven pomoci</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-sm">{getWelcomeMessage()}</p>
              </div>
            )}
            
            {messages.filter(m => m.role !== 'system').map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-[#1a3a5f] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="text-sm prose prose-sm max-w-none">
                      <Streamdown>{msg.content}</Streamdown>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg rounded-bl-none shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-100 p-4 bg-white flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Napište nám..."
              className="flex-1 border-gray-200 focus:border-[#22c55e] focus:ring-[#22c55e]"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white"
            >
              <Send size={18} />
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}
