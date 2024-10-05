"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import { check } from "@/api/auth";
import { apiClient } from "@/api";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  loading: boolean;
  // login: () => void;
  // logout: () => void;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/auth/check");
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to check authentication", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  const value = { isAuthenticated, loading, user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
