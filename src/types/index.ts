export type LanguageCode = 'English' | 'Nepali' | 'Spanish' | 'Arabic' | 'French' | 'Hindi' | 'Mandarin' | 'Swahili';

export type SubjectCategory = 
  | 'Artificial Intelligence & Python'
  | 'Mathematics & Logic'
  | 'Physics & Engineering'
  | 'Biology & Life Sciences'
  | 'Environmental & Climate Science'
  | 'World History & Civilizations'
  | 'Global Economics & Literacy';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'gemini' | 'intelligent-core';
  subject?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export interface ConceptAnalysis {
  summary: string;
  analogy: string;
  keyPrinciples: string[];
  commonMisconception: string;
  realWorldApplication: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  tag: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface CurriculumTrack {
  id: string;
  title: string;
  category: SubjectCategory;
  description: string;
  lessonsCount: number;
  estimatedHours: number;
  difficulty: string;
  modules: {
    id: string;
    title: string;
    topics: string[];
    completed?: boolean;
  }[];
}
