import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, VolumeX, Sparkles, Copy, Check, RotateCcw, Brain, BookOpen, ChevronDown } from 'lucide-react';
import { ChatMessage, LanguageCode, SubjectCategory } from '../types';

interface TutorViewProps {
  selectedLanguage: LanguageCode;
  onAwardXP: (amount: number) => void;
}

const SUBJECT_OPTIONS: { id: string; label: string }[] = [
  { id: 'Artificial Intelligence & Python', label: 'AI & Python' },
  { id: 'Physics & Engineering', label: 'Physics' },
  { id: 'Mathematics & Logic', label: 'Mathematics' },
  { id: 'Environmental & Climate Science', label: 'Climate & Ecology' },
  { id: 'World History & Civilizations', label: 'Global History' },
  { id: 'General Science', label: 'General' },
];

const GRADE_LEVELS = ['Middle School', 'High School', 'Undergraduate', 'Lifelong / Professional'];

const SAMPLE_PROMPTS = [
  'How do Neural Networks learn via backpropagation?',
  'Why do astronauts in orbit feel weightless?',
  'Explain the mathematical intuition behind Bayes Theorem.',
  'How does the greenhouse effect work at the molecular level?',
  'What were the most transformative discoveries of the Silk Road?',
  'Write a clean Python generator to calculate Fibonacci numbers.',
];

export const TutorView: React.FC<TutorViewProps> = ({ selectedLanguage, onAwardXP }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('education_ai_tutor_history');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `👋 **Welcome to Education AI Global!**\n\nI am **Socrates AI**, your interactive global tutor. I can break down advanced STEM concepts, explain Python algorithms, guide you through physics and mathematics derivations, and discuss world history in your chosen language.\n\n*Choose a subject and ask any question below, or select a sample question to begin!*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'gemini',
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('Artificial Intelligence & Python');
  const [gradeLevel, setGradeLevel] = useState('High School');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('education_ai_tutor_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subject,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          subject,
          gradeLevel,
          language: selectedLanguage,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Thank you for your question! What would you like to explore next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini',
        subject,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      onAwardXP(15);
    } catch (err) {
      console.error('Tutor chat failed:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `I encountered an unexpected connection issue. Please check your network or try again shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'intelligent-core',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown formatting symbols before speaking
    const cleanText = text.replace(/[*#`_\-\[\]]/g, ' ').replace(/\n+/g, '. ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const clearChat = () => {
    if (speakingId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Chat session refreshed. Select any subject above and ask what you'd like to understand!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'gemini',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-6xl mx-auto px-2 sm:px-4">
      {/* Controls Bar */}
      <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-t-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Subject Pills */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {SUBJECT_OPTIONS.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSubject(sub.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                  subject === sub.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Grade Level Selector */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Level:</span>
            <select
              aria-label="Target Learner Level"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
            >
              {GRADE_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Chat */}
          <button
            onClick={clearChat}
            title="Reset conversation"
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/70 border-x border-slate-800 space-y-5">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-bold text-xs'
                    : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20'
                }`}
              >
                {isUser ? 'YOU' : <Brain className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm shadow-md transition-all ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-white/10 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">
                    {isUser ? 'You' : 'Socrates AI Tutor'}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.source && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                        {msg.source === 'gemini' ? 'Gemini 3.8' : 'Local AI'}
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {/* Content formatted */}
                <div className="prose prose-invert prose-sm max-w-none space-y-2 leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>

                {/* Action buttons for assistant messages */}
                {!isUser && (
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800 text-xs text-slate-400">
                    <button
                      onClick={() => handleSpeak(msg.id, msg.content)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-800 transition ${
                        speakingId === msg.id ? 'text-cyan-400 font-medium' : ''
                      }`}
                    >
                      {speakingId === msg.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 animate-spin" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-800 transition"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 text-white animate-pulse">
              <Brain className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>Analyzing concept across global educational standards...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      <div className="bg-slate-950 border-x border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs text-slate-400">
        <span className="shrink-0 text-indigo-400 font-semibold flex items-center gap-1">
          <BookOpen className="w-3 h-3" /> Prompts:
        </span>
        {SAMPLE_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-600 hover:text-indigo-200 transition text-[11px]"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-b-xl p-3 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask Socrates anything about ${subject} (${selectedLanguage})...`}
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium text-sm flex items-center gap-1.5 shadow-md shadow-indigo-600/30 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </form>
      </div>
    </div>
  );
};
