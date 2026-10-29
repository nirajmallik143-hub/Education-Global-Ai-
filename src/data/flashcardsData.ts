import { Flashcard } from '../types';

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    subject: 'AI & Python',
    tag: 'Python Syntax',
    difficulty: 'Beginner',
    front: 'What is a Python Generator, and how does `yield` differ from `return`?',
    back: 'A generator produces items lazily one at a time on demand instead of allocating memory for the entire sequence at once. `yield` pauses the function state and yields a value to the caller, resuming upon the next `next()` call.'
  },
  {
    id: 'fc-2',
    subject: 'AI & Python',
    tag: 'Neural Networks',
    difficulty: 'Intermediate',
    front: 'What is the role of an Activation Function (e.g., ReLU) in a Neural Network?',
    back: 'Activation functions introduce non-linearity into the network. Without non-linear activations, no matter how many layers a neural network has, it would merely behave as a single linear transformation (W1 * W2 * x = W_combined * x).'
  },
  {
    id: 'fc-3',
    subject: 'AI & Python',
    tag: 'Automation Pipelines',
    difficulty: 'Intermediate',
    front: 'How do vector embeddings allow LLMs to perform semantic search?',
    back: 'Embeddings map words, sentences, or images into high-dimensional vector space where semantically similar concepts reside near one another as measured by Cosine Similarity or Euclidean Distance.'
  },
  {
    id: 'fc-4',
    subject: 'Physics & Engineering',
    tag: 'Electromagnetism',
    difficulty: 'Intermediate',
    front: 'What does Faraday’s Law of Electromagnetic Induction state?',
    back: 'A changing magnetic flux through a closed circuit loop induces an electromotive force (EMF) and electric current in the circuit (EMF = -dΦ/dt). This is the foundation of electric generators, transformers, and induction motors.'
  },
  {
    id: 'fc-5',
    subject: 'Physics & Engineering',
    tag: 'Relativity',
    difficulty: 'Advanced',
    front: 'What is Gravitational Time Dilation according to Einstein’s General Relativity?',
    back: 'Time passes more slowly in stronger gravitational fields (closer to massive bodies). GPS satellites orbiting Earth must compensate for this relativistic time divergence (~38 microseconds per day) to maintain meter-level navigation accuracy.'
  },
  {
    id: 'fc-6',
    subject: 'Mathematics & Logic',
    tag: 'Linear Algebra',
    difficulty: 'Intermediate',
    front: 'What is an Eigenvector and Eigenvalue of a square matrix A?',
    back: 'An eigenvector v is a non-zero vector that does not change direction when linear transformation A is applied; it is only scaled by factor λ (the eigenvalue): A * v = λ * v. Key to Google PageRank, PCA, and quantum state vectors.'
  },
  {
    id: 'fc-7',
    subject: 'Environmental Science',
    tag: 'Ecosystems',
    difficulty: 'Beginner',
    front: 'What is the Albedo Effect, and why is Arctic ice melting a positive feedback loop?',
    back: 'Albedo is the fraction of solar radiation reflected by a surface. White ice has high albedo (~80% reflection). When ice melts into dark ocean water (low albedo ~10%), more heat is absorbed, warming water further and accelerating melting.'
  },
  {
    id: 'fc-8',
    subject: 'Global History',
    tag: 'Golden Age of Science',
    difficulty: 'Beginner',
    front: 'What was the House of Wisdom (Bayt al-Hikmah) in 9th century Baghdad?',
    back: 'A major intellectual academy and library where scholars translated Greek, Persian, Indian, and Mesopotamian texts into Arabic, pioneering algebra (Al-Khwarizmi), optics (Ibn al-Haytham), medicine (Ibn Sina), and preservation of global knowledge.'
  }
];
