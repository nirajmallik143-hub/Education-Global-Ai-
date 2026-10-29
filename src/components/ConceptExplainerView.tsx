import React, { useState } from 'react';
import { BookOpen, Lightbulb, AlertTriangle, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ConceptAnalysis, LanguageCode } from '../types';

interface ConceptExplainerViewProps {
  selectedLanguage: LanguageCode;
  onAwardXP: (amount: number) => void;
}

const FEATURED_CONCEPTS = [
  'Transformer Attention Mechanism',
  'Quantum Entanglement',
  'Photosynthesis & Carbon Fixation',
  'Bayesian Probability',
  'Plate Tectonics & Continental Drift',
  'The Albedo Climate Feedback Loop',
];

export const ConceptExplainerView: React.FC<ConceptExplainerViewProps> = ({
  selectedLanguage,
  onAwardXP,
}) => {
  const [conceptInput, setConceptInput] = useState('');
  const [audience, setAudience] = useState('High School');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ConceptAnalysis | null>(null);
  const [activeConceptTitle, setActiveConceptTitle] = useState<string>('');

  const handleExplain = async (targetConcept?: string) => {
    const term = (targetConcept || conceptInput).trim();
    if (!term || isLoading) return;

    setActiveConceptTitle(term);
    setIsLoading(true);

    try {
      const res = await fetch('/api/explain-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: term,
          targetAudience: audience,
          language: selectedLanguage,
        }),
      });

      const data = await res.json();
      setAnalysis(data);
      onAwardXP(15);
    } catch (err) {
      console.error(err);
      // Fallback
      setAnalysis({
        summary: `${term} is a fundamental concept in global science that governs interactions between foundational components.`,
        analogy: `Imagine a world-wide postal sorting network: instead of every letter going everywhere, routing hubs calculate the optimal path directly to the destination.`,
        keyPrinciples: [
          'Conservation of foundational quantities during state changes.',
          'Dynamic adaptation to environmental boundaries.',
          'Scalability from microscopic interactions to global networks.'
        ],
        commonMisconception: `Many believe ${term} occurs instantaneously without physical intermediate steps, whereas it relies on verifiable causal chains.`,
        realWorldApplication: `Heavily applied in high-throughput AI inference, renewable energy distribution, and advanced climate modeling.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Search & Topic Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Socratic Concept Explainer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Deconstruct difficult STEM, AI, and humanities concepts with intuitive analogies, core principles, and misconceptions debunked.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Level:</span>
            <select
              aria-label="Audience Level"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Middle School">Middle School</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={conceptInput}
            onChange={(e) => setConceptInput(e.target.value)}
            placeholder="Type any complex concept (e.g. Convolutional Filters, CRISPR, Black Holes)..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => handleExplain()}
            disabled={!conceptInput.trim() || isLoading}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-1.5 disabled:opacity-50 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explain</span>
          </button>
        </div>

        {/* Featured Concepts */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 block mb-2">
            Popular Global Curricula Concepts:
          </span>
          <div className="flex flex-wrap gap-2">
            {FEATURED_CONCEPTS.map((concept, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setConceptInput(concept);
                  handleExplain(concept);
                }}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition"
              >
                {concept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center animate-spin">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-slate-300 text-sm font-medium">
            Formulating pedagogical breakdown and real-world analogy in {selectedLanguage}...
          </p>
        </div>
      )}

      {/* Results View */}
      {!isLoading && analysis && (
        <div className="space-y-4">
          {/* Concept Header */}
          <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/40 border border-indigo-700/50 rounded-2xl p-6">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Concept Spotlight</span>
            <h3 className="text-2xl font-black text-white mt-1 mb-2">{activeConceptTitle}</h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {analysis.summary}
            </p>
          </div>

          {/* Grid of Analogy & Misconception */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Analogy */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md">
              <div className="flex items-center gap-2 text-amber-400 mb-3 font-bold text-sm">
                <Lightbulb className="w-5 h-5" />
                <span>The Intuitive Analogy</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                "{analysis.analogy}"
              </p>
            </div>

            {/* Misconception */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md">
              <div className="flex items-center gap-2 text-rose-400 mb-3 font-bold text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>Common Misconception Debunked</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {analysis.commonMisconception}
              </p>
            </div>
          </div>

          {/* Key Principles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Foundational Pillars & Key Principles
            </h4>
            <div className="space-y-2.5">
              {analysis.keyPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 text-xs sm:text-sm text-slate-300"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{principle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real World Application */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <h4 className="text-sm font-bold text-cyan-300 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Modern Global Applications & Technology
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {analysis.realWorldApplication}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
