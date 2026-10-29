import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Circle, Clock, Award, ChevronDown, ChevronUp, Sparkles, Download } from 'lucide-react';
import { GLOBAL_CURRICULUM_TRACKS } from '../data/curriculumData';
import { CurriculumTrack } from '../types';

interface CurriculumViewProps {
  onAwardXP: (amount: number) => void;
  userScore: number;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onAwardXP, userScore }) => {
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('education_ai_completed_topics');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return ['m1-0', 'm1-1'];
  });

  const [expandedTrackId, setExpandedTrackId] = useState<string>('ai-python-automation');
  const [showCertificateTrack, setShowCertificateTrack] = useState<CurriculumTrack | null>(null);

  useEffect(() => {
    localStorage.setItem('education_ai_completed_topics', JSON.stringify(completedTopicIds));
  }, [completedTopicIds]);

  const toggleTopic = (topicKey: string) => {
    if (completedTopicIds.includes(topicKey)) {
      setCompletedTopicIds((prev) => prev.filter((id) => id !== topicKey));
    } else {
      setCompletedTopicIds((prev) => [...prev, topicKey]);
      onAwardXP(25);
    }
  };

  const calculateTrackProgress = (track: CurriculumTrack) => {
    let totalTopics = 0;
    let completed = 0;
    track.modules.forEach((mod) => {
      mod.topics.forEach((_, tIdx) => {
        totalTopics++;
        if (completedTopicIds.includes(`${mod.id}-${tIdx}`)) {
          completed++;
        }
      });
    });
    return totalTopics === 0 ? 0 : Math.round((completed / totalTopics) * 100);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Global Standardized Curriculum Tracks
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Aligned with global international baccalaureate, Cambridge STEM, and modern AI automation standards.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/60 px-4 py-2 rounded-xl text-xs">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">
              Completed Topics: <strong className="text-white">{completedTopicIds.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Tracks List */}
      <div className="space-y-4">
        {GLOBAL_CURRICULUM_TRACKS.map((track) => {
          const isExpanded = expandedTrackId === track.id;
          const progress = calculateTrackProgress(track);
          const isFinished = progress === 100;

          return (
            <div
              key={track.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              {/* Track Title Card */}
              <div
                onClick={() => setExpandedTrackId(isExpanded ? '' : track.id)}
                className="p-5 sm:p-6 cursor-pointer hover:bg-slate-800/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                      {track.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {track.estimatedHours}h estimated
                    </span>
                    <span className="text-xs text-slate-400">
                      • {track.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{track.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{track.description}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Progress ring or bar */}
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-300 mb-1">{progress}% Completed</div>
                    <div className="w-28 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {isFinished && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCertificateTrack(track);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md shadow-amber-500/20 transition"
                    >
                      <Award className="w-3.5 h-3.5" /> Certificate
                    </button>
                  )}

                  <div className="text-slate-400 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Modules breakdown */}
              {isExpanded && (
                <div className="p-5 sm:p-6 bg-slate-950/70 border-t border-slate-800 space-y-6">
                  {track.modules.map((mod) => (
                    <div key={mod.id} className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4">
                      <h4 className="text-sm font-bold text-indigo-300 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        {mod.title}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mod.topics.map((topic, tIdx) => {
                          const topicKey = `${mod.id}-${tIdx}`;
                          const isDone = completedTopicIds.includes(topicKey);

                          return (
                            <button
                              key={topicKey}
                              onClick={() => toggleTopic(topicKey)}
                              className={`flex items-center gap-2.5 p-2.5 rounded-lg text-left text-xs sm:text-sm font-medium transition border ${
                                isDone
                                  ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
                                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                              )}
                              <span>{topic}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Certificate Modal */}
      {showCertificateTrack && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-500/60 rounded-3xl max-w-2xl w-full p-8 text-center shadow-2xl relative">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 ring-2 ring-amber-500/50">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-amber-400 font-extrabold">
              Education AI Global Certificate of Completion
            </span>
            <h3 className="text-2xl font-black text-white mt-2 mb-2">
              Mastery Verified
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
              This certifies successful completion of all curriculum modules and competencies in:
            </p>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl text-base font-bold text-indigo-300 mb-6">
              {showCertificateTrack.title}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-800/80 pt-4 px-4 mb-6">
              <span>Date: {new Date().toLocaleDateString()}</span>
              <span>Learner Score: {userScore} XP</span>
              <span>Credential ID: EDU-AI-{Math.floor(Math.random() * 899999 + 100000)}</span>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowCertificateTrack(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 transition"
              >
                <Download className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
