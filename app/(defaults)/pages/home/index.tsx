"use client";
import React, { useState } from "react";
import Banner from "./content/banner/banner";
import FeaturedListing from "./content/properties/featured-listing";
import PreConstructedProject from "./content/properties/pre-constructed-project";
import MapComponent from "./content/map";
import CalculatorGrid from "./content/calculator-grid/calculator-grid";
import calculatorData from "../../../../data/calculator-items.json";
import { CalculatorDataProps } from "@/types/calculator-data-types";
import SoldProperties from "./content/properties/sold-properties";

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
