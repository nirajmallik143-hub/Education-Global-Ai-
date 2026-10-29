import { CurriculumTrack } from '../types';

export const GLOBAL_CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    id: 'ai-python-automation',
    title: 'AI, Python Programming & Smart Automation',
    category: 'Artificial Intelligence & Python',
    description: 'Master foundational Python, machine learning algorithms, computer vision pipelines, and intelligent workflow automation.',
    lessonsCount: 24,
    estimatedHours: 40,
    difficulty: 'All Levels',
    modules: [
      {
        id: 'm1',
        title: 'Python Fundamentals & Data Structures',
        topics: ['Variables & Types', 'Lists, Dictionaries & Sets', 'Functions & Lambdas', 'OOP Basics']
      },
      {
        id: 'm2',
        title: 'Scientific Computing with NumPy & Pandas',
        topics: ['Vectorized Arrays', 'Data Cleaning & Transformation', 'Time-series Handling', 'Data Visualization']
      },
      {
        id: 'm3',
        title: 'Neural Networks & Deep Learning Essentials',
        topics: ['Perceptrons & Activation Functions', 'Loss Functions & Gradients', 'Backpropagation', 'Convolutional Layers']
      },
      {
        id: 'm4',
        title: 'Modern AI Pipelines & Workflow Automation',
        topics: ['LLM Orchestration', 'Automated Video Processing', 'REST APIs with FastAPI', 'Edge Deployment']
      }
    ]
  },
  {
    id: 'mathematics-logic',
    title: 'Global Calculus, Linear Algebra & Discrete Mathematics',
    category: 'Mathematics & Logic',
    description: 'Build an intuitive and rigorous understanding of rates of change, multi-dimensional matrix spaces, and algorithmic graph logic.',
    lessonsCount: 20,
    estimatedHours: 35,
    difficulty: 'Intermediate',
    modules: [
      {
        id: 'm5',
        title: 'Calculus: Derivatives, Limits & Integrals',
        topics: ['Limits and Continuity', 'Derivative Rules & Optimization', 'Riemann Sums', 'Fundamental Theorem of Calculus']
      },
      {
        id: 'm6',
        title: 'Linear Algebra for Machine Intelligence',
        topics: ['Vectors & Dot Products', 'Matrices & Transformations', 'Determinants & Inverses', 'Eigenvalues & Eigenvectors']
      },
      {
        id: 'm7',
        title: 'Probability & Statistical Inference',
        topics: ['Bayes Theorem', 'Random Variables & Distributions', 'Hypothesis Testing', 'Monte Carlo Methods']
      }
    ]
  },
  {
    id: 'physics-space',
    title: 'Applied Physics, Quantum Mechanics & Aerospace',
    category: 'Physics & Engineering',
    description: 'Explore the universal laws governing motion, electromagnetic waves, thermodynamic energy flows, and spacetime curvature.',
    lessonsCount: 18,
    estimatedHours: 30,
    difficulty: 'Intermediate to Advanced',
    modules: [
      {
        id: 'm8',
        title: 'Classical Mechanics & Gravitational Fields',
        topics: ['Newtonian Laws of Motion', 'Conservation of Momentum & Energy', 'Orbital Mechanics & Escape Velocity', 'Fluid Dynamics']
      },
      {
        id: 'm9',
        title: 'Electromagnetism & Wave Optics',
        topics: ['Maxwell Equations', 'Electromagnetic Spectrum', 'Wave Interference & Diffraction', 'Photon Nature of Light']
      },
      {
        id: 'm10',
        title: 'Introduction to Quantum Systems & Relativity',
        topics: ['Wave-Particle Duality', 'Heisenberg Uncertainty Principle', 'Special Relativity & Time Dilation', 'Curvature of Spacetime']
      }
    ]
  },
  {
    id: 'environmental-climate',
    title: 'Earth Systems, Climate Science & Sustainable Energy',
    category: 'Environmental & Climate Science',
    description: 'Investigate biosphere feedback loops, renewable energy technologies, global water cycles, and ecological balance.',
    lessonsCount: 16,
    estimatedHours: 25,
    difficulty: 'Beginner to Intermediate',
    modules: [
      {
        id: 'm11',
        title: 'Planetary Climate Systems & Carbon Cycles',
        topics: ['Atmospheric Composition & Greenhouse Effect', 'Oceanic Thermohaline Circulation', 'Cryosphere & Sea Level Dynamics', 'Carbon Budgets']
      },
      {
        id: 'm12',
        title: 'Renewable Power & Grid Decarbonization',
        topics: ['Photovoltaic Solar Physics', 'Wind Turbine Aerodynamics', 'Grid Energy Storage & Battery Tech', 'Green Hydrogen']
      }
    ]
  },
  {
    id: 'world-history-cultures',
    title: 'World Civilizations, Silk Roads & Global Exchange',
    category: 'World History & Civilizations',
    description: 'Travel through ancient trade routes, scientific golden ages across Asia, the Middle East, Africa, and Europe, and the industrial revolutions.',
    lessonsCount: 15,
    estimatedHours: 22,
    difficulty: 'All Levels',
    modules: [
      {
        id: 'm13',
        title: 'Ancient Trade Networks & The Silk Road',
        topics: ['Eurasian Commercial Corridors', 'Diffusion of Paper, Astronomy & Algebra', 'Himalayan & Maritime Spice Routes', 'Cultural Syncretism']
      },
      {
        id: 'm14',
        title: 'Scientific Revolutions & Industrial Eras',
        topics: ['House of Wisdom in Baghdad', 'The European Enlightenment', 'Steam Engines & Mechanization', 'The Digital Information Age']
      }
    ]
  }
];
