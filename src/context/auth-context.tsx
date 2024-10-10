"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  loading: boolean;
}

export interface User {
  user_id: number;
  username: string;
}

const fakeUser = {
  user_id: 1,
  username: "admin1",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      if (!isAuthenticated || !user) {
        try {
          const response = await apiClient.get("/auth/check");
          if (response.status === 200) {
            if (!user){
              setUser({
                user_id: response.data.user_id,
                username: response.data.username,
              });
            }
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          if(process.env.NEXT_PUBLIC_APP_STATUS === "PRODUCTION") console.clear();
          console.error("Failed to check authentication", error);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        return;
      }
    };
    checkAuth();
  }, [router]);

  const value: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    user,
    setUser,
  };

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
