import { AtAGlance } from "@/types/property-card-types";
import React from "react";

interface PropertyCardProps {
  details: AtAGlance;
}

const AtAGlanceComponent = ({ details }: PropertyCardProps) => {
  return (
    <div className="border rounded p-4 w-full mx-auto mt-4 bg-gray-100">
      <h2 className="bg-gray-900 text-yellow-500 font-bold p-2">
        At a Glance:
      </h2>
      <ul className="list-none p-0">
        <li className="py-1">
          <strong>Type:</strong> {details.Type}
        </li>
        <li className="py-1">
          <strong>Area:</strong> {details.Area}
        </li>
        <li className="py-1">
          <strong>Municipality:</strong> {details.Municipality}
        </li>
        <li className="py-1">
          <strong>Neighbourhood:</strong> {details.Neighbourhood}
        </li>
        <li className="py-1">
          <strong>Style:</strong> {details.Style}
        </li>
        <li className="py-1">
          <strong>Beds:</strong> {details.Beds}
        </li>
        <li className="py-1">
          <strong>Baths:</strong> {details.Baths}
        </li>
        <li className="py-1">
          <strong>Fireplace:</strong> {details.Fireplace}
        </li>
        <li className="py-1">
          <strong>Pool:</strong> {details.Pool}
        </li>
      </ul>
    </div>
  );
};

export default AtAGlanceComponent;
