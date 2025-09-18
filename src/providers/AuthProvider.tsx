"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { profileAction } from "@/actions/user.action";

interface User {
  id: number;
  email: string;
  fullName: string;
  image: string | null;
  nickname: string | null;
  provider: string;
  providerAccountId: string | null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  emailVerified: string | null;
  emailVerificationToken: string | null;
  emailVerificationExpiry: string | null;
  password: string | null;
  passwordResetToken: string | null;
  passwordResetTokenExpiry: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await profileAction();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}