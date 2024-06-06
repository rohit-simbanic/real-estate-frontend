import AgentSignup from "@/theme/components/form/agent-signup";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Signup Page",
};

const page = () => {
  return (
    <div>
      <AgentSignup />
    </div>
  );
};

export default page;
