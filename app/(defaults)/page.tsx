import HomePage from "@/pages/home/home";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home Page",
};

const Home = () => {
  return <HomePage />;
};

export default Home;
