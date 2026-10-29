"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loginUser, logoutUser, readSession } from "@/lib/mock-auth";
import type { PublicUser } from "@/types/user";

type AuthContextValue = {
  user: PublicUser | null;
  ready: boolean;
  login: (
    email: string,
    password: string,
  ) => { ok: true } | { ok: false; message: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readSession());
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const result = loginUser(email, password);
    if (!result.ok) return result;
    setUser(result.user);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, logout }),
    [user, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth yalnızca AuthProvider içinde kullanılabilir.");
  }
  return context;
}
