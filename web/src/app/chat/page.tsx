'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, TrendingUp, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const SUGGESTED_QUESTIONS = [
  { text: "What will WTI price be next week?", icon: TrendingUp },
  { text: "Is Brent crude going up or down?", icon: BarChart3 },
  { text: "Best arbitrage opportunity now?", icon: Sparkles },
  { text: "30-day oil price prediction", icon: TrendingUp },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm CrudeIntel AI, your oil price prediction assistant. Ask me about crude oil prices, market predictions, or trading opportunities. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // GSAP hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I couldn't process that request. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please make sure the API is running.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] max-w-5xl mx-auto">
      {/* Hero Header */}
      <motion.div
        ref={heroRef}
        className="text-center mb-4 sm:mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 sm:mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />
          <span className="text-xs sm:text-sm text-emerald-400 font-medium">AI-Powered Predictions</span>
        </motion.div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          CrudeIntel AI Chat
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto px-4">
          Ask questions about oil prices and get instant AI predictions
        </p>
      </motion.div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col overflow-hidden border-zinc-800/50 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-2xl">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex gap-2 sm:gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <motion.div
                    className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </motion.div>
                )}
                <motion.div
                  className={`max-w-[80%] sm:max-w-[75%] rounded-2xl p-3 sm:p-4 shadow-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white'
                      : 'bg-zinc-800/80 text-zinc-100 border border-zinc-700/50'
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="text-[10px] sm:text-xs mt-1.5 sm:mt-2 opacity-50">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </motion.div>
                {message.role === 'user' && (
                  <motion.div
                    className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-zinc-700 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading Animation */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-zinc-800/80 rounded-2xl p-4 border border-zinc-700/50">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-emerald-500"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-emerald-500"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-emerald-500"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                    <span className="text-sm text-zinc-400 ml-2">Analyzing...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <AnimatePresence>
          {messages.length <= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="px-3 sm:px-6 pb-3 sm:pb-4"
            >
              <p className="text-[10px] sm:text-xs text-zinc-500 mb-2 sm:mb-3 font-medium uppercase tracking-wide">Quick Questions</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTED_QUESTIONS.map((q, i) => {
                  const Icon = q.icon;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => sendMessage(q.text)}
                      className="flex items-center gap-2 text-left text-xs sm:text-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white border border-zinc-700/50 transition-all"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{q.text}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <motion.div
          className="border-t border-zinc-800/50 p-3 sm:p-4 bg-zinc-900/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-2 sm:gap-3">
            <motion.div className="flex-1 relative" whileFocus={{ scale: 1.01 }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about oil prices..."
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <kbd className="hidden md:inline-block px-2 py-1 text-xs text-zinc-500 bg-zinc-700/50 rounded">
                  Enter
                </kbd>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="h-full px-3 sm:px-5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-xl shadow-lg shadow-emerald-500/20"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
}
