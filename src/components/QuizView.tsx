import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, RefreshCw, Sparkles, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { LanguageCode, QuizData, QuizQuestion } from '../types';

interface QuizViewProps {
  selectedLanguage: LanguageCode;
  onAwardXP: (amount: number) => void;
}

const PRESET_TOPICS = [
  { topic: 'Python Programming & Algorithms', subject: 'Artificial Intelligence & Python' },
  { topic: 'Deep Learning & Neural Network Architectures', subject: 'Artificial Intelligence & Python' },
  { topic: 'Gravitational Fields & Orbital Mechanics', subject: 'Physics & Engineering' },
  { topic: 'Calculus: Derivatives & Optimization', subject: 'Mathematics & Logic' },
  { topic: 'Planetary Climate Systems & Carbon Cycles', subject: 'Environmental & Climate Science' },
  { topic: 'The Silk Road & Ancient Cultural Synthesis', subject: 'World History & Civilizations' },
];

export const QuizView: React.FC<QuizViewProps> = ({ selectedLanguage, onAwardXP }) => {
  const [customTopic, setCustomTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const startQuizForTopic = async (topic: string, subject = 'STEM') => {
    setIsLoading(true);
    setErrorMsg(null);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizCompleted(false);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          subject,
          difficulty: selectedDifficulty,
          count: 4,
          language: selectedLanguage,
        }),
      });

      if (!res.ok) throw new Error('Quiz generation failed');
      const data: QuizData = await res.json();
      if (!data.questions || data.questions.length === 0) {
        throw new Error('No questions returned');
      }
      setQuizData(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not load quiz questions. Using built-in fallback deck.');
      // Emergency built-in quiz
      setQuizData({
        title: `${topic} Challenge`,
        questions: [
          {
            question: `Which principle is most foundational when analyzing ${topic}?`,
            options: [
              'Systemic equilibrium and structured conservation laws',
              'Random untracked divergence',
              'Static isolation without inputs',
              'Linear reductionism only'
            ],
            correctIndex: 0,
            explanation: `Modern global science demonstrates that ${topic} relies on conservation, feedback loops, and empirical validation.`
          },
          {
            question: `How is predictive accuracy maximized in ${topic}?`,
            options: [
              'By relying on single anecdotal observations',
              'Through iterative mathematical modeling and cross-validation',
              'By ignoring edge test cases',
              'Via uncalibrated assumptions'
            ],
            correctIndex: 1,
            explanation: 'Cross-validation and empirical testing are universal standards in both natural sciences and AI.'
          }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !quizData) return;
    setIsAnswerSubmitted(true);

    const currentQ = quizData.questions[currentQuestionIndex];
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      onAwardXP(20);
    }
  };

  const handleNextQuestion = () => {
    if (!quizData) return;
    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      onAwardXP(50); // bonus for finishing full quiz
    }
  };

  const currentQ: QuizQuestion | undefined = quizData?.questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Quiz Header & Generator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              Global Knowledge Quiz Arena
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Generate AI-powered challenges on any concept or test yourself with standard global curriculum tracks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Difficulty:</span>
            <select
              aria-label="Difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Medium">Medium</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Custom Topic Generator */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Type any topic (e.g. Transformers, Plate Tectonics, Matrix Multiplication)..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => customTopic.trim() && startQuizForTopic(customTopic.trim())}
            disabled={!customTopic.trim() || isLoading}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-50 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate</span>
          </button>
        </div>

        {/* Preset Topic Chips */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Curated Curricula:
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_TOPICS.map((pt, i) => (
              <button
                key={i}
                onClick={() => startQuizForTopic(pt.topic, pt.subject)}
                className="px-3 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition"
              >
                {pt.topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center animate-spin">
            <RefreshCw className="w-6 h-6" />
          </div>
          <p className="text-slate-300 font-medium">Synthesizing comprehensive questions with pedagogical rationale...</p>
          <p className="text-xs text-slate-500">Adapting to: {selectedLanguage}</p>
        </div>
      )}

      {/* Error state */}
      {errorMsg && (
        <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 mb-4 text-xs text-amber-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Active Quiz Card */}
      {!isLoading && quizData && !isQuizCompleted && currentQ && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
                {quizData.title}
              </span>
              <h3 className="text-sm font-medium text-slate-400">
                Question {currentQuestionIndex + 1} of {quizData.questions.length}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                Score: {score} / {quizData.questions.length}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <h4 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
              {currentQ.question}
            </h4>
          </div>

          {/* 4 Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                } else {
                  optionStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-500';
                }
              } else if (isSelected) {
                optionStyle = 'bg-indigo-950/60 border-indigo-500 text-white ring-1 ring-indigo-500';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border font-medium text-sm transition-all flex items-start justify-between gap-3 ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pedagogical Explanation Box */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-xl mb-6 border text-xs sm:text-sm leading-relaxed ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                : 'bg-indigo-950/30 border-indigo-800/60 text-indigo-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Explanation & Learning Takeaway:</span>
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm shadow-md transition"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:opacity-95 text-white font-medium text-sm flex items-center gap-2 shadow-md transition"
              >
                <span>{currentQuestionIndex + 1 < quizData.questions.length ? 'Next Question' : 'Complete Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completion Summary Modal */}
      {!isLoading && isQuizCompleted && quizData && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-black text-white">Quiz Completed!</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            You successfully finished the <span className="text-indigo-300 font-semibold">{quizData.title}</span>.
          </p>

          <div className="flex justify-center items-center gap-6 py-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-6 py-3">
              <span className="text-2xl font-black text-white">{score} / {quizData.questions.length}</span>
              <p className="text-xs text-slate-400">Final Score</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-6 py-3">
              <span className="text-2xl font-black text-amber-400">+{score * 20 + 50} XP</span>
              <p className="text-xs text-slate-400">Points Earned</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => startQuizForTopic(quizData.title.replace(' Challenge', ''))}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-4 h-4" /> Retry Quiz
            </button>
            <button
              onClick={() => {
                setQuizData(null);
                setCustomTopic('');
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition"
            >
              Choose Another Topic
            </button>
          </div>
        </div>
      )}

      {/* Initial Callout if no quiz loaded */}
      {!isLoading && !quizData && (
        <div className="text-center py-12 px-4 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
          <Award className="w-10 h-10 text-indigo-400 mx-auto mb-3 opacity-60" />
          <h4 className="text-base font-semibold text-slate-300">Ready to test your knowledge?</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Pick a curated curriculum topic above or type any subject into the custom box to build an instant adaptive quiz.
          </p>
        </div>
      )}
    </div>
  );
};
