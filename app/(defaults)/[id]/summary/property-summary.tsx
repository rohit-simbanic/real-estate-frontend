import React from "react";
import { PropertyDetails } from "@/types/property-card-types";

interface PropertyCardProps {
  details: PropertyDetails;
}

const PropertySummary: React.FC<PropertyCardProps> = ({ details }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-start gap-4 p-4 m-3 rounded-sm bg-gray-100 mt-7 w-full shadow-lg">
      <span className="text-orange-500 font-semibold">{details?.price}</span>
      <span className="text-blue-600 font-medium">
        Property Status - {details?.category}
      </span>
      <span className="text-gray-700">Listing ID: {details?.listing_id}</span>
      <span className="text-gray-700">{details?.general_details.Address}</span>
    </div>
  );
};

export default PropertySummary;
