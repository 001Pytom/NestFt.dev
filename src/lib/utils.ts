import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DifficultyLevel = "Easy" | "Intermediate" | "Advanced"
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert"
export type Technology = 
  | "React" 
  | "Node.js" 
  | "Express" 
  | "MongoDB" 
  | "Socket.io" 
  | "HTML/CSS" 
  | "JavaScript" 
  | "TypeScript"
  | "Python"
  | "Django"
  | "Flask"
  | "PostgreSQL"
  | "MySQL"
  | "APIs"
  | "Next.js"
  | "Vue.js"
  | "Angular"
  | "Tailwind CSS"