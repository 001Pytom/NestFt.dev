import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "./supabase";
import { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    provider: "github" | "google" | "email",
    credentials?: { email: string; password: string }
  ) => Promise<void>;
  // signup: (email: string, password: string, metadata?: any) => Promise<void>;
  signup: (
    email: string,
    password: string,
    metadata?: { [key: string]: string }
  ) => Promise<{ user: User | null; session: Session | null }>;

  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (
      set
      //  get
    ) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (provider, credentials) => {
        try {
          if (provider === "email" && credentials) {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: credentials.email,
              password: credentials.password,
            });
            if (error) throw error;
            set({ user: data.user, isAuthenticated: !!data.user });
          } else {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: provider as "github" | "google",
              options: {
                redirectTo: `${window.location.origin}/dashboard`,
              },
            });
            if (error) throw error;
          }
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },

      // signup: async (email, password, metadata) => {
      //   try {
      //     const { data, error } = await supabase.auth.signUp({
      //       email,
      //       password,
      //       options: {
      //         data: metadata,
      //         emailRedirectTo: `${window.location.origin}/auth/callback`,
      //       },
      //     });

      //     if (error) throw error;

      //     set({ user: data.user, isAuthenticated: !!data.user });
      //   } catch (error) {
      //     console.error("Signup error:", error);
      //     throw error;
      //   }
      // },

      signup: async (email, password, metadata) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: metadata,
              emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
          });

          if (error) throw error;

          // User is only authenticated if session exists
          set({
            user: data.user,
            isAuthenticated: !!data.session,
          });

          return data;
        } catch (error) {
          console.error("Signup error:", error);
          throw error;
        }
      },

      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error("Logout error:", error);
          throw error;
        }
      },

      initialize: async () => {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          set({
            user: session?.user || null,
            isAuthenticated: !!session?.user,
            isLoading: false,
          });

          // Listen for auth changes
          supabase.auth.onAuthStateChange((event, session) => {
            set({
              user: session?.user || null,
              isAuthenticated: !!session?.user,
              isLoading: false,
            });
          });
        } catch (error) {
          console.error("Auth initialization error:", error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
