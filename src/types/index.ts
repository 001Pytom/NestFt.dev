import { DifficultyLevel, SkillLevel, Technology } from "../lib/utils";

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  technologies: Technology[];
  requirements: string[];
  thumbnail: string;
  completed_by: number;
  estimated_hours: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  skill_level: SkillLevel;
  projects_completed: number;
  points: number;
  joined_at: string;
  streak_days: number;
  github_username?: string;
}

export interface UserProject {
  id: string;
  user_id: string;
  project_id: string;
  status: "in-progress" | "completed" | "abandoned";
  repository_url?: string;
  deployed_url?: string;
  score?: number;
  started_at: string;
  completed_at?: string;
  collaborators?: string[];
}

export interface Leaderboard {
  user_id: string;
  name: string;
  avatar_url: string;
  points: number;
  projects_completed: number;
  rank: number;
}
