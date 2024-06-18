import React from "react";
import PropertySummary from "./summary/property-summary";
import ImageSlider from "./gallery/product-gallery";
import Tabs from "./tabs/details-tab";
import AtAGlanceComponent from "./highlight-section/at-a-glance";
import StreetView from "./map/street-view";
import LeadForm from "@/theme/components/form/lead-form";
import { fetchProperty } from "../pages/home/features/properties/actions";

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const idPrefix = params.id.slice(0, 4);
  const endpoint =
    idPrefix === "NXYZ"
      ? `properties/${params.id}`
      : `pre-constructed-property/${params.id}`;

  const property = await fetchProperty(endpoint);

  return (
    <div className="container mx-auto">
      <PropertySummary details={property} />
      <div className="flex justify-between items-center gap-3 max-md:flex-col">
        <ImageSlider images={property?.property_images} />
        <LeadForm />
      </div>
      <div className="flex justify-between items-center gap-3 max-md:flex-col">
        <Tabs property={property} />
        <AtAGlanceComponent details={property?.at_a_glance} />
      </div>
      <StreetView details={property} />
    </div>
  );
};

export default Page;
