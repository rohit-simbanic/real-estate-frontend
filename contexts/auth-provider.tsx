import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  agent: any;
  login: (token: string, agentId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [agent, setAgent] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const agentId = localStorage.getItem("agentId");
    if (token && agentId) {
      setIsAuthenticated(true);
      fetchAgent(agentId); // Function to fetch agent data based on agentId
    }
  }, []);

  const fetchAgent = async (agentId: string) => {
    try {
      const response = await axios.get(
        `https://backend-real-estate-m1zm.onrender.com/agents/${agentId}`
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
    <AuthContext.Provider value={{ isAuthenticated, agent, login, logout }}>
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
