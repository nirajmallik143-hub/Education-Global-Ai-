import React, { useState } from 'react';
import { X, Download, ShieldCheck, WifiOff, FileText, Check, Database } from 'lucide-react';
import { INITIAL_FLASHCARDS } from '../data/flashcardsData';
import { GLOBAL_CURRICULUM_TRACKS } from '../data/curriculumData';

interface OfflineToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineToolsModal: React.FC<OfflineToolsModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const downloadFile = (filename: string, content: string, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportFlashcardsJSON = () => {
    const saved = localStorage.getItem('education_ai_flashcards');
    const cards = saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
    downloadFile('education-ai-global-flashcards.json', JSON.stringify(cards, null, 2), 'application/json');
    setDownloadSuccess('Flashcards downloaded');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const exportCurriculumMarkdown = () => {
    let md = `# Education AI Global - Complete Study Curriculum\n\n`;
    GLOBAL_CURRICULUM_TRACKS.forEach((track) => {
      md += `## ${track.title} (${track.category})\n`;
      md += `*Estimated hours: ${track.estimatedHours}h | Level: ${track.difficulty}*\n\n`;
      md += `${track.description}\n\n`;
      track.modules.forEach((mod) => {
        md += `### ${mod.title}\n`;
        mod.topics.forEach((t) => {
          md += `- [ ] ${t}\n`;
        });
        md += `\n`;
      });
      md += `---\n\n`;
    });

    downloadFile('education-ai-global-curriculum.md', md, 'text/markdown');
    setDownloadSuccess('Curriculum syllabus downloaded');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const exportTutorNotes = () => {
    const saved = localStorage.getItem('education_ai_tutor_history');
    if (!saved) return;
    const history = JSON.parse(saved);
    let md = `# Socrates AI Tutor - Study Notes Export\nGenerated: ${new Date().toLocaleString()}\n\n`;
    history.forEach((msg: any) => {
      md += `### ${msg.role === 'user' ? 'Student Question' : 'Socrates AI Explanation'} (${msg.timestamp})\n\n`;
      md += `${msg.content}\n\n---\n\n`;
    });

    downloadFile('socrates-study-notes.md', md, 'text/markdown');
    setDownloadSuccess('Study notes exported');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <WifiOff className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Global Offline & Low-Bandwidth Suite</h3>
            <p className="text-xs text-slate-400">Designed for seamless learning anywhere in the world</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          Education AI Global is built to empower students in low-connectivity environments. Download comprehensive study guides, flashcard decks, and revision notes to continue learning without active internet access.
        </p>

        {downloadSuccess && (
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3 mb-4 text-xs text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{downloadSuccess} successfully!</span>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={exportCurriculumMarkdown}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-600 transition text-left group"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition">
                  Offline Curriculum Syllabus (.md)
                </div>
                <div className="text-xs text-slate-500">
                  Full module checklists for STEM, AI & Python, Physics, and History
                </div>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          </button>

          <button
            onClick={exportFlashcardsJSON}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-600 transition text-left group"
          >
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                  Active Recall Decks (.json)
                </div>
                <div className="text-xs text-slate-500">
                  Export all curated & custom flashcards for offline apps (Anki, Quizlet, etc.)
                </div>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          </button>

          <button
            onClick={exportTutorNotes}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-600 transition text-left group"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition">
                  Tutor Conversation Notes (.md)
                </div>
                <div className="text-xs text-slate-500">
                  Save all Socrates answers, code snippets, and explanations locally
                </div>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Local Storage Caching Enabled</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
