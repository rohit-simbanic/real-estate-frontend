"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  agent: any;
  login: (token: string, agentId: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const agentId = localStorage.getItem("agentId");
    if (token && agentId) {
      setIsAuthenticated(true);
      fetchAgent(agentId); // Function to fetch agent data based on agentId
    }
    setLoading(false);
  }, [router]);

  const fetchAgent = async (agentId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/agent/agents/${agentId}`
      );
      setAgent(response.data);
    } catch (err) {
      console.error("Error fetching agent data:", err);
    }
  };

  const login = (token: string, agentId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("agentId", agentId);
    setIsAuthenticated(true);
    fetchAgent(agentId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("agentId");
    setIsAuthenticated(false);
    setAgent(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, agent, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
