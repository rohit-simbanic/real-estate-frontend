import React from "react";
import Banner from "./features/components/banner";
import FeaturedListing from "./features/components/featured-listing";
import PreConstructedProject from "./features/components/pre-constructed-project";
import { Property } from "@/types/constructed-property-card-types";
import MapComponent from "./features/components/map";
import CalculatorGrid from "./features/components/services/calculator-grid";
import propertiesData from "../../data/pre-construction-property.json";
import calculatorData from "../../data/calculator-items.json";
import { CalculatorDataProps } from "@/types/calculator-data-types";
import SoldProperties from "./features/components/sold-properties";

const HomePage: React.FC = () => {
  const calculatorItems: CalculatorDataProps[] =
    calculatorData as CalculatorDataProps[];
  return (
    <div>
      <Banner />
      <FeaturedListing />
      <PreConstructedProject />
      <SoldProperties />
      <CalculatorGrid items={calculatorItems} />
      <MapComponent />
    </div>
  );
};

export default HomePage;
