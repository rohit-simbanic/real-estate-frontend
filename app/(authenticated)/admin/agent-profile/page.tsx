"use client";
import React, { useEffect, useState } from "react";
import AgentProfile from "./[id]/Page";

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

export default Page;
