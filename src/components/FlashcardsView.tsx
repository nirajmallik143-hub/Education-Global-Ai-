import React, { useState, useEffect } from 'react';
import { Layers, RotateCw, CheckCircle, XCircle, Shuffle, Plus, Sparkles, BookOpen } from 'lucide-react';
import { Flashcard } from '../types';
import { INITIAL_FLASHCARDS } from '../data/flashcardsData';

interface FlashcardsViewProps {
  onAwardXP: (amount: number) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ onAwardXP }) => {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('education_ai_flashcards');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_FLASHCARDS;
  });

  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('education_ai_mastered_cards');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New card modal state
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newSubject, setNewSubject] = useState('AI & Python');

  useEffect(() => {
    localStorage.setItem('education_ai_flashcards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('education_ai_mastered_cards', JSON.stringify(masteredIds));
  }, [masteredIds]);

  const filteredCards = cards.filter(
    (c) => selectedSubject === 'All' || c.subject.includes(selectedSubject)
  );

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % (filteredCards.length || 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % (filteredCards.length || 1));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const toggleMastered = (id: string) => {
    if (masteredIds.includes(id)) {
      setMasteredIds((prev) => prev.filter((item) => item !== id));
    } else {
      setMasteredIds((prev) => [...prev, id]);
      onAwardXP(10);
    }
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;

    const newCard: Flashcard = {
      id: `custom-${Date.now()}`,
      front: newFront.trim(),
      back: newBack.trim(),
      subject: newSubject,
      tag: 'Custom',
      difficulty: 'Intermediate',
    };

    setCards((prev) => [newCard, ...prev]);
    setNewFront('');
    setNewBack('');
    setShowAddModal(false);
    setCurrentIndex(0);
    setIsFlipped(false);
    onAwardXP(20);
  };

  const subjects = ['All', 'AI & Python', 'Physics', 'Mathematics', 'Environmental', 'History'];
  const masteryPercentage = cards.length > 0 ? Math.round((masteredIds.length / cards.length) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Active Recall Flashcard Decks
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Retain critical theorems, algorithms, and definitions through spaced repetition.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center gap-1.5 transition"
              title="Shuffle Cards"
            >
              <Shuffle className="w-4 h-4" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Card</span>
            </button>
          </div>
        </div>

        {/* Mastery Progress Bar */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4">
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-slate-400">Mastery Progress</span>
            <span className="text-indigo-400">{masteredIds.length} of {cards.length} Mastered ({masteryPercentage}%)</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${masteryPercentage}%` }}
            />
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                selectedSubject === sub
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard Area */}
      {filteredCards.length > 0 && currentCard ? (
        <div className="flex flex-col items-center">
          {/* Card counter */}
          <div className="text-xs text-slate-400 mb-3 font-mono">
            Card {currentIndex + 1} of {filteredCards.length}
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[280px] sm:min-h-[320px] bg-slate-900 border-2 border-slate-800 hover:border-indigo-600/60 rounded-3xl p-6 sm:p-10 shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-300 relative select-none group"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                {currentCard.subject} • {currentCard.tag}
              </span>
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1 group-hover:text-indigo-400 transition">
                <RotateCw className="w-3.5 h-3.5" /> Click to flip
              </span>
            </div>

            {/* Content Front/Back */}
            <div className="py-6 text-center">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-indigo-400">
                    Question / Prompt
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-slate-100 leading-snug">
                    {currentCard.front}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400">
                    Answer / Core Concept
                  </span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl mx-auto">
                    {currentCard.back}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <span>Difficulty: {currentCard.difficulty}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard.id);
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition ${
                  masteredIds.includes(currentCard.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {masteredIds.includes(currentCard.id) ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mastered!</span>
                  </>
                ) : (
                  <span>Mark Mastered</span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm transition"
            >
              Previous
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              <span>{isFlipped ? 'Show Question' : 'Show Answer'}</span>
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm transition"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl">
          <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-slate-300 text-sm">No flashcards found for this subject filter.</p>
        </div>
      )}

      {/* Add Custom Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Create New Active Recall Flashcard</h3>
            <form onSubmit={handleCreateCard} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Subject</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="AI & Python">AI & Python</option>
                  <option value="Physics & Engineering">Physics & Engineering</option>
                  <option value="Mathematics & Logic">Mathematics & Logic</option>
                  <option value="Environmental Science">Environmental Science</option>
                  <option value="Global History">Global History</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Front (Question or Prompt)</label>
                <textarea
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  placeholder="e.g. What is the difference between supervised and unsupervised learning?"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 h-20"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Back (Comprehensive Answer)</label>
                <textarea
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  placeholder="Provide a clear, accurate explanation..."
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 h-24"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition shadow-md"
                >
                  Save Card (+20 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
