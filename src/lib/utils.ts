import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const difficultyLevels = ["Easy", "Intermediate", "Hard"] as const;
export type DifficultyLevel = (typeof difficultyLevels)[number];

export type SkillLevel = "Newbie" | "Intermediate";

export const technologies = [
  "HTML/CSS",
  "JavaScript",
  "React",
  "MongoDB",
  "Socket.io",
   "APIs",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "Django",
  "Express",
  "Next.js",
  "TypeScript",
  "TailwindCSS",
] as const;

export type Technology = (typeof technologies)[number];
