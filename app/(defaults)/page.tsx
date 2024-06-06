import { useAuth } from "@/contexts/auth-provider";
import HomePage from "@/pages/home/home";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home Page",
};

const Home = () => {
  const { isAuthenticated } = useAuth();
  return <HomePage isAuthenticated={isAuthenticated} />;
};

export default Home;
