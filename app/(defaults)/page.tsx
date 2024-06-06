import { Metadata } from "next";
import React from "react";
import HomePage from "./pages/home/home";

export const metadata: Metadata = {
  title: "Home Page",
};

const Home = () => {
  return <HomePage />;
};

export default Home;
