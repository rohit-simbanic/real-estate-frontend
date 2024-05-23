import React from "react";
interface TitleProps {
  title: string;
  description: string;
}

const SectionTitle: React.FC<TitleProps> = ({ title, description }) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold sm:text-4xl text-center text-gray-900 dark:text-white ">
        {title}
      </h2>
      <p className="mt-4 pb-6 text-gray-600 text-center dark:text-teal-600 uppercase">
        {description}
      </p>
    </div>
  );
};

export default SectionTitle;
