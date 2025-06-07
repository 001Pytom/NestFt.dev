"use client";

import { create } from "zustand";
import { supabase } from "./supabase";
import { SkillLevel } from "./utils";
import { Project } from "@/types";

// ---------- Types ----------

type User = {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
  skill_level: SkillLevel | null;
};

type ProjectState = {
  currentProject: Project | null;
  files: Record<string, string>;
  collaborators: User[];
  setCurrentProject: (project: Project) => void;
  updateFile: (filename: string, content: string) => void;
  saveProject: () => Promise<void>;
  deployProject: () => Promise<void>;
  addCollaborator: (user: User) => void;
  removeCollaborator: (userId: string) => void;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (
    provider: "github" | "google" | "email",
    email?: string,
    password?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  setSkillLevel: (level: SkillLevel) => Promise<void>;
};

// ---------- Project Store ----------

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  files: {},
  collaborators: [],

  setCurrentProject: (project) => set({ currentProject: project }),

  updateFile: (filename, content) =>
    set((state) => ({
      files: { ...state.files, [filename]: content },
    })),

  saveProject: async () => {
    const { currentProject, files } = get();
    if (!currentProject) return;

    try {
      await supabase.from("project_files").upsert({
        project_id: currentProject.id,
        files: files,
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving project:", error);
      throw error;
    }
  },

  deployProject: async () => {
    // Implement deployment logic
    console.log("Deploy project...");
  },

  addCollaborator: (user) =>
    set((state) => ({
      collaborators: [...state.collaborators, user],
    })),

  removeCollaborator: (userId) =>
    set((state) => ({
      collaborators: state.collaborators.filter((c) => c.id !== userId),
    })),
}));

// ---------- Auth Store ----------

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  signup: async (email, password, name) => {
    set({ isLoading: true });

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: { name },
          },
        }
      );

      if (signUpError) throw signUpError;
      if (!authData.user) return; // likely needs email confirmation

      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: authData.user.id, name, email, avatar_url: "" }]);

      if (profileError) throw profileError;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      set({ user: profile, isAuthenticated: true });
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (provider, email, password) => {
    try {
      set({ isLoading: true });
      let result;

      if (provider === "email" && email && password) {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      } else {
        result = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            // In Next.js this is safe — window will be defined in client components
            redirectTo:
              typeof window !== "undefined"
                ? `${window.location.origin}/dashboard`
                : undefined,
          },
        });
      }

      if (result.error) throw result.error;

      if (provider === "email") {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", result.data.user?.id)
          .single();

        set({
          user: profile,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await supabase.auth.signOut();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error("Logout error:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  setSkillLevel: async (level) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No authenticated user");

      await supabase
        .from("profiles")
        .update({ skill_level: level })
        .eq("id", user.id);

      set((state) => ({
        user: state.user ? { ...state.user, skill_level: level } : null,
      }));
    } catch (error) {
      console.error("Set skill level error:", error);
      throw error;
    }
  },
}));
