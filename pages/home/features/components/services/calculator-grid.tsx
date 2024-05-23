import React from "react";
import SectionTitle from "@/theme/components/section-title/section-title";
import CalculatorCard from "../calculator";
import { CalculatorDataProps } from "@/types/calculator-data-types";

const CalculatorGrid: React.FC<{ items: CalculatorDataProps[] }> = ({
  items = [],
}) => {
  return (
    <section className="container mx-auto px-4 mt-8">
      <SectionTitle
        title="Real Estate Calculators"
        description="SELECT CALCULATOR FROM FOLLOWING LIST"
      />
      <div className="p-1 flex flex-wrap items-center justify-center">
        {items.map((item, index) => (
          <CalculatorCard
            key={index}
            title={item.title}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default CalculatorGrid;
