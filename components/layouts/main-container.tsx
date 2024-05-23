import React from "react";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-container text-black dark:text-white-dark">
      {children}
    </div>
  );
};

export default MainContainer;
