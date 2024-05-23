"use client";
import { PropertyDetails } from "@/types/property-card-types";
import React, { useState } from "react";
interface PropertyCardProps {
  property: PropertyDetails;
}

const Tabs: React.FC<PropertyCardProps> = ({ property }) => {
  const [activeTab, setActiveTab] = useState("general");

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  return (
    <div className="rounded border w-full mx-auto mt-4 h-[363px]">
      {/* Tabs */}
      <ul id="tabs" className="inline-flex pt-2 px-1 w-full border-b">
        <li
          className={`${
            activeTab === "general"
              ? "bg-white border-t border-r border-l -mb-px"
              : "dark:text-white"
          } px-4 text-gray-800 font-semibold py-2 rounded-t`}
        >
          <a
            href="#general"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("general");
            }}
          >
            General Details
          </a>
        </li>
        <li
          className={`${
            activeTab === "interior"
              ? "bg-white border-t border-r border-l -mb-px"
              : "dark:text-white"
          } px-4 text-gray-800 font-semibold py-2 rounded-t`}
        >
          <a
            href="#interior"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("interior");
            }}
          >
            Room Interior
          </a>
        </li>
        <li
          className={`${
            activeTab === "exterior"
              ? "bg-white border-t border-r border-l -mb-px"
              : "dark:text-white"
          } px-4 text-gray-800 font-semibold py-2 rounded-t`}
        >
          <a
            href="#exterior"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("exterior");
            }}
          >
            Exterior
          </a>
        </li>
        <li
          className={`${
            activeTab === "utilities"
              ? "bg-white border-t border-r border-l -mb-px"
              : "dark:text-white"
          } px-4 text-gray-800 font-semibold py-2 rounded-t`}
        >
          <a
            href="#utilities"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("utilities");
            }}
          >
            Utilities
          </a>
        </li>
      </ul>

      {/* Tab Contents */}
      <div id="tab-contents">
        <div className={`p-4 ${activeTab === "general" ? "" : "hidden"}`}>
          <p className="dark:text-gray-400">
            Price: {property.general_details.Price}
          </p>
          <p className="dark:text-gray-400">
            Taxes: {property.general_details.Taxes}
          </p>
          <p className="dark:text-gray-400">
            Address: {property.general_details.Address}
          </p>
          <p className="dark:text-gray-400">
            Lot Size: {property.general_details.Lot_Size}
          </p>
          <p className="dark:text-gray-400">
            Directions: {property.general_details.Directions_Cross_Streets}
          </p>
        </div>
        <div className={`p-4 ${activeTab === "interior" ? "" : "hidden"}`}>
          <p className="dark:text-gray-400">
            Rooms: {property.room_interior.Rooms}
          </p>
          <p className="dark:text-gray-400">
            Rooms Plus: {property.room_interior.Rooms_plus}
          </p>
          <p className="dark:text-gray-400">
            Bedrooms: {property.room_interior.Bedrooms}
          </p>
          <p className="dark:text-gray-400">
            Bedrooms Plus: {property.room_interior.Bedrooms_plus}
          </p>
          <p className="dark:text-gray-400">
            Kitchens: {property.room_interior.Kitchens}
          </p>
          <p className="dark:text-gray-400">
            Family Room: {property.room_interior.Family_Room}
          </p>
          <p className="dark:text-gray-400">
            Basement: {property.room_interior.Basement}
          </p>
        </div>
        <div className={`p-4 ${activeTab === "exterior" ? "" : "hidden"}`}>
          <p className="dark:text-gray-400">
            Property Type: {property.exterior.Property_Type}
          </p>
          <p className="dark:text-gray-400">Style: {property.exterior.Style}</p>
          <p className="dark:text-gray-400">
            Exterior: {property.exterior.Exterior}
          </p>
          <p className="dark:text-gray-400">
            Garage Type: {property.exterior.Garage_Type}
          </p>
          <p className="dark:text-gray-400">
            Drive Parking Spaces: {property.exterior.Drive_Parking_Spaces}
          </p>
          <p className="dark:text-gray-400">Pool: {property.exterior.Pool}</p>
        </div>
        <div className={`p-4 ${activeTab === "utilities" ? "" : "hidden"}`}>
          <p className="dark:text-gray-400">
            Fireplace/Stove: {property.utilities.Fireplace_Stove}
          </p>
          <p className="dark:text-gray-400">
            Heat Source: {property.utilities.Heat_Source}
          </p>
          <p className="dark:text-gray-400">
            Heat Type: {property.utilities.Heat_Type}
          </p>
          <p className="dark:text-gray-400">
            Central Air Conditioning:{" "}
            {property.utilities.Central_Air_Conditioning}
          </p>
          <p className="dark:text-gray-400">
            Laundry Level: {property.utilities.Laundry_Level}
          </p>
          <p className="dark:text-gray-400">
            Sewers: {property.utilities.Sewers}
          </p>
          <p className="dark:text-gray-400">
            Water: {property.utilities.Water}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
