import React, { useEffect, useState } from "react";
import PropertySummary from "./summary/property-summary";
import {
  fetchSinglePreconstructedProperty,
  fetchSingleProperty,
} from "@/helpers/product-fetch";
import ImageSlider from "./gallery/product-gallery";
import Tabs from "./tabs/details-tab";
import AtAGlanceComponent from "./highlight-section/at-a-glance";
import StreetView from "./map/street-view";
import LeadForm from "@/theme/components/form/lead-form";

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const idPrefix = params.id.slice(0, 4);
  let displayProduct;
  if (idPrefix === "NXYZ") {
    const property = await fetchSingleProperty(params.id);
    displayProduct = property;
  } else if (idPrefix === "PXYZ") {
    const preConstProperty = await fetchSinglePreconstructedProperty(params.id);
    displayProduct = preConstProperty;
  }

  return (
    <div className="container mx-auto">
      <PropertySummary details={displayProduct} />
      <div className="flex justify-between items-center gap-3 max-md:flex-col">
        <ImageSlider images={displayProduct?.property_images} />
        <LeadForm />
      </div>
      <div className="flex justify-between items-center gap-3 max-md:flex-col">
        <Tabs property={displayProduct} />
        <AtAGlanceComponent details={displayProduct?.at_a_glance} />
      </div>
      <StreetView details={displayProduct} />
    </div>
  );
};

export default Page;
