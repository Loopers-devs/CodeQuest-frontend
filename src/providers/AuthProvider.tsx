"use client";
import { createContext, useContext, ReactNode } from "react";
import { useUser } from "@/hooks/use-user";
import { User } from "@/interfaces";
import { QueryObserverResult } from "@tanstack/react-query";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<QueryObserverResult<User | null, Error>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading: loading, refetch: refreshUser } = useUser();

  return (
    <AuthContext.Provider value={{ user: user ? user : null, loading, refreshUser }}>
      { children }
    </AuthContext.Provider>
  );
}