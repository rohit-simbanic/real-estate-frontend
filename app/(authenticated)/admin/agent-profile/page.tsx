"use client";
import React, { useEffect, useState } from "react";
import AgentProfile from "./[id]/Page";
import withAuth from "@/helpers/with-auth-hoc";
import { useAuth } from "@/contexts/auth-provider";

const Page = () => {
  const [agentId, setAgentId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAgentId = localStorage.getItem("agentId");
      setAgentId(storedAgentId);
    }
  }, []);
  return (
    <div>
      <AgentProfile
        params={{
          id: `${agentId}`,
        }}
      />
    </div>
  );
};

export default withAuth(Page);
