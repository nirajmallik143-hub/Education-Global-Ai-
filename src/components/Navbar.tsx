import React from 'react';
import { Globe, Sparkles, BookOpen, Wifi, Award, DownloadCloud } from 'lucide-react';
import { LanguageCode } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedLanguage: LanguageCode;
  setSelectedLanguage: (lang: LanguageCode) => void;
  onOpenOfflineModal: () => void;
  geminiConnected: boolean;
  score: number;
}

const LANGUAGES: { code: LanguageCode; label: string; flag: string }[] = [
  { code: 'English', label: 'English', flag: '🌐' },
  { code: 'Nepali', label: 'नेपाली (Nepali)', flag: '🇳🇵' },
  { code: 'Arabic', label: 'العربية (Arabic)', flag: '🇦🇪' },
  { code: 'Spanish', label: 'Español', flag: '🇪🇸' },
  { code: 'French', label: 'Français', flag: '🇫🇷' },
  { code: 'Hindi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'Mandarin', label: '中文 (Mandarin)', flag: '🇨🇳' },
  { code: 'Swahili', label: 'Kiswahili', flag: '🇰🇪' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedLanguage,
  setSelectedLanguage,
  onOpenOfflineModal,
  geminiConnected,
  score,
}) => {
  const tabs = [
    { id: 'tutor', label: 'AI Tutor', icon: Sparkles },
    { id: 'quiz', label: 'Interactive Quizzes', icon: Award },
    { id: 'concept', label: 'Concept Explainer', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: Globe },
    { id: 'curriculum', label: 'Global Curriculum', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('tutor')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <Globe className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  EDUCATION AI GLOBAL
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  Global Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Democratizing intelligent learning worldwide
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                aria-label="Select platform language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as LanguageCode)}
                className="bg-slate-800 text-xs sm:text-sm text-slate-200 font-medium px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none pr-7 transition-colors"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-100">
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400 text-xs">
                ▼
              </div>
            </div>

            {/* Offline / Low-Bandwidth Tools */}
            <button
              onClick={onOpenOfflineModal}
              title="Low-Bandwidth & Offline Tools"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <DownloadCloud className="w-3.5 h-3.5 text-cyan-400" />
              <span>Offline Ready</span>
            </button>

            {/* Knowledge Points */}
            <div className="flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-800/60 px-3 py-1.5 rounded-lg">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-indigo-200">{score} XP</span>
            </div>

            {/* AI Engine Status */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-slate-800/80 border border-slate-700">
              <span className={`w-2 h-2 rounded-full ${geminiConnected ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-indigo-400'}`} />
              <span className="text-slate-300 font-mono text-[11px]">
                {geminiConnected ? 'Gemini 3.8 Flash' : 'Global Core AI'}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
