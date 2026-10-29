import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TutorView } from './components/TutorView';
import { QuizView } from './components/QuizView';
import { ConceptExplainerView } from './components/ConceptExplainerView';
import { FlashcardsView } from './components/FlashcardsView';
import { CurriculumView } from './components/CurriculumView';
import { OfflineToolsModal } from './components/OfflineToolsModal';
import { LanguageCode } from './types';
import { Globe, Heart, Shield, Code, Sparkles } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<'tutor' | 'quiz' | 'concept' | 'flashcards' | 'curriculum'>('tutor');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('English');
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [geminiConnected, setGeminiConnected] = useState(false);

  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('education_ai_xp');
    return saved ? parseInt(saved, 10) : 120;
  });

  const awardXP = (amount: number) => {
    setScore((prev) => {
      const next = prev + amount;
      localStorage.setItem('education_ai_xp', next.toString());
      return next;
    });
  };

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.geminiEnabled) {
          setGeminiConnected(true);
        }
      })
      .catch((err) => {
        console.warn('Backend health check error:', err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => setCurrentTab(tab as any)}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        onOpenOfflineModal={() => setIsOfflineModalOpen(true)}
        geminiConnected={geminiConnected}
        score={score}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-4 sm:py-6">
        {currentTab === 'tutor' && (
          <TutorView selectedLanguage={selectedLanguage} onAwardXP={awardXP} />
        )}

        {currentTab === 'quiz' && (
          <QuizView selectedLanguage={selectedLanguage} onAwardXP={awardXP} />
        )}

        {currentTab === 'concept' && (
          <ConceptExplainerView selectedLanguage={selectedLanguage} onAwardXP={awardXP} />
        )}

        {currentTab === 'flashcards' && (
          <FlashcardsView onAwardXP={awardXP} />
        )}

        {currentTab === 'curriculum' && (
          <CurriculumView onAwardXP={awardXP} userScore={score} />
        )}
      </main>

      {/* Offline Tools Modal */}
      <OfflineToolsModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-400">EDUCATION AI GLOBAL</span>
            <span>— Open, Accessible & Multilingual AI Learning</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>MIT Licensed</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" /> AI Powered
            </span>
            <span>•</span>
            <button
              onClick={() => setIsOfflineModalOpen(true)}
              className="hover:text-indigo-400 underline underline-offset-2 transition"
            >
              Offline Ready
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
