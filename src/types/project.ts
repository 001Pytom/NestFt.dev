export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  stack: 'frontend' | 'backend' | 'fullstack';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  estimatedHours: number;
  maxPoints: number;
  requirements: string[];
  gradingCriteria: GradingCriteria[];
  folderStructure: FolderStructure;
}

export interface GradingCriteria {
  id: string;
  category: string;
  description: string;
  maxPoints: number;
  requirements: string[];
}

export interface FolderStructure {
  [key: string]: string | FolderStructure;
}

export interface TechStack {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: TechTemplate[];
}

export interface TechTemplate {
  id: string;
  name: string;
  description: string;
  language: string;
  framework?: string;
  folderStructure: FolderStructure;
  dependencies: string[];
  startCommand: string;
}

export interface UserProgress {
  userId: string;
  currentStage: 'beginner' | 'intermediate' | 'advanced';
  completedProjects: {
    projectId: string;
    score: number;
    completedAt: string;
  }[];
  totalPoints: number;
  canAdvance: boolean;
}

export interface ProjectSubmission {
  id: string;
  userId: string;
  projectId: string;
  code: { [filename: string]: string };
  repositoryUrl?: string;
  deployedUrl?: string;
  submittedAt: string;
  score?: number;
  feedback?: AIFeedback[];
  status: 'pending' | 'graded' | 'failed';
}

export interface AIFeedback {
  category: string;
  score: number;
  maxScore: number;
  feedback: string;
  suggestions: string[];
}