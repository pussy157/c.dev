import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type Role = "admin" | "user" | null;

interface AuthState {
  isReady: boolean;
  user: User | null;
  session: Session | null;
  role: Role;
  email: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

async function fetchRole(userId: string): Promise<Role> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) return null;
  if (data?.role === "admin") return "admin";
  return "user";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    let unsub: { data?: { subscription: { unsubscribe: () => void } } } | null = null;

    const init = async () => {
      if (!supabase) {
        setIsReady(true);
        return;
      }

      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);

      if (data.session?.user?.id) {
        setRole(await fetchRole(data.session.user.id));
      } else {
        setRole(null);
      }

      unsub = supabase.auth.onAuthStateChange(async (_event, newSession) => {
        setSession(newSession);
        if (newSession?.user?.id) setRole(await fetchRole(newSession.user.id));
        else setRole(null);
      });

      setIsReady(true);
    };

    init();

    return () => {
      unsub?.data?.subscription.unsubscribe();
    };
  }, []);

  const api = useMemo<AuthState>(() => {
    const user = session?.user ?? null;

    return {
      isReady,
      user,
      session,
      role,
      email: user?.email ?? null,

      async signInWithGoogle() {
        if (!supabase) throw new Error("Supabase not configured");
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: window.location.origin },
        });
        if (error) throw error;
      },

      async signInWithEmail(email: string, password: string) {
        if (!supabase) throw new Error("Supabase not configured");
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      },

      async signUpWithEmail(email: string, password: string) {
        if (!supabase) throw new Error("Supabase not configured");
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
      },

      async signOut() {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      },
    };
  }, [isReady, session, role]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider />");
  return ctx;
}
