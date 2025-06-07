"use client";

import { useEffect } from "react";
import { supabase } from "./supabase";
import { useAuthStore } from "./store";

export function useAuthListener() {
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          if (session?.user) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            useAuthStore.setState({
              user: profile,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } else if (event === "SIGNED_OUT") {
          useAuthStore.setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
}
