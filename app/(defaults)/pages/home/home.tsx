"use client";
import React, { useState } from "react";
import Banner from "./features/components/banner";
import FeaturedListing from "./features/components/featured-listing";
import PreConstructedProject from "./features/components/pre-constructed-project";
import MapComponent from "./features/components/map";
import CalculatorGrid from "./features/components/services/calculator-grid";
import calculatorData from "../../../../data/calculator-items.json";
import { CalculatorDataProps } from "@/types/calculator-data-types";
import SoldProperties from "./features/components/sold-properties";

const HomePage = () => {
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const calculatorItems: CalculatorDataProps[] =
    calculatorData as CalculatorDataProps[];
  const handleEdit = (id: string) => {
    setPropertyId(id);
  };

  return (
    <div>
      <Banner />
      <FeaturedListing onEdit={handleEdit} />
      <PreConstructedProject onEdit={handleEdit} />
      <SoldProperties />
      <CalculatorGrid items={calculatorItems} />
      <MapComponent />
    </div>
  );
};

export default HomePage;
