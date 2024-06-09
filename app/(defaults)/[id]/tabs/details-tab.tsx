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
      <ul
        id="tabs"
        className="flex flex-col sm:flex-row pt-2 px-1 w-full border-b"
      >
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
            <span className="font-bold underline">Price:</span>
            {property.general_details.Price}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Taxes:</span>
            {property.general_details.Taxes}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Address:</span>
            {property.general_details.Address}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Lot Size:</span>
            {property.general_details.Lot_Size}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Directions:</span>
            {property.general_details.Directions}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Details:</span>
            {property.property_description}
          </p>
        </div>
        <div className={`p-4 ${activeTab === "interior" ? "" : "hidden"}`}>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Rooms: </span>
            {property.room_interior.Rooms}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Rooms Plus:</span>{" "}
            {property.room_interior.Rooms_plus}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Bedrooms: </span>
            {property.room_interior.Bedrooms}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Bedrooms Plus:</span>{" "}
            {property.room_interior.Bedrooms_plus}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Kitchens:</span>{" "}
            {property.room_interior.Kitchens}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Family Room: </span>
            {property.room_interior.Family_Room}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Basement: </span>
            {property.room_interior.Basement}
          </p>
        </div>
        <div className={`p-4 ${activeTab === "exterior" ? "" : "hidden"}`}>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Property Type: </span>
            {property.exterior.Property_Type}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Style:</span>{" "}
            {property.exterior.Style}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Exterior: </span>
            {property.exterior.Exterior}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Garage Type:</span>{" "}
            {property.exterior.Garage_Type}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Drive Parking Spaces:</span>{" "}
            {property.exterior.Drive_Parking_Spaces}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Pool: </span>
            {property.exterior.Pool}
          </p>
        </div>
        <div className={`p-4 ${activeTab === "utilities" ? "" : "hidden"}`}>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Fireplace/Stove:</span>{" "}
            {property.utilities.Fireplace_Stove}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Heat Source:</span>{" "}
            {property.utilities.Heat_Source}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Heat Type:</span>{" "}
            {property.utilities.Heat_Type}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">
              Central Air Conditioning:
            </span>
            {property.utilities.Central_Air_Conditioning}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Laundry Level:</span>{" "}
            {property.utilities.Laundry_Level}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Sewers:</span>{" "}
            {property.utilities.Sewers}
          </p>
          <p className="dark:text-gray-400">
            <span className="font-bold underline">Water:</span>{" "}
            {property.utilities.Water}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
