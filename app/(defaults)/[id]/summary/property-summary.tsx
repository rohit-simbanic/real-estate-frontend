import React from "react";
import { PropertyDetails } from "@/types/property-card-types";

interface PropertyCardProps {
  details: PropertyDetails;
}

const PropertySummary: React.FC<PropertyCardProps> = ({ details }) => {
  // console.log("all details:", details);
  return (
    <div className="flex items-center justify-start gap-4 p-4 rounded-lg bg-gray-400 mt-7 w-full">
      <span className="text-orange-500 font-semibold">{details.price}</span>
      <span className="text-blue-600 font-medium">
        Available for - {details.available_for}
      </span>
      <span className="text-gray-700">Listing ID: {details.listing_id}</span>
      <span className="text-gray-700">{details.general_details.Address}</span>
    </div>
  );
};

export default PropertySummary;
