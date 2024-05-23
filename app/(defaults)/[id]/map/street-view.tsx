//@ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { PropertyDetails } from "@/types/property-card-types";
import { extractLatLngFromUrl } from "@/helpers/map-helper";
import EmbedMap from "./gmap-view";

interface PropertyDetails {
  street_view: string;
}

interface PropertyCardProps {
  details: PropertyDetails;
}

const StreetView: React.FC<PropertyCardProps> = ({
  details,
}: PropertyCardProps) => {
  const streetViewRef = useRef(null);
  const [activeTab, setActiveTab] = useState("streeview");
  const { lat, lng } = extractLatLngFromUrl(details.street_view);

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyBmfGXc7WjW75dzbdgJQ2da-FtX2DuFjLw",
      version: "weekly",
    });

    loader.load().then(() => {
      const panorama = new google.maps.StreetViewPanorama(
        streetViewRef.current,
        {
          position: { lat, lng },
          pov: { heading: 264.32, pitch: 0, zoom: 0 },
          motionTracking: false,
          motionTrackingControl: false,
        }
      );
    });
  }, [lat, lng]);

  return (
    <div className="rounded border w-[80%] mx-auto mt-4 h-[600px] mb-4">
      {/* Tabs */}
      <ul id="tabs" className="inline-flex pt-2 px-1 w-full border-b">
        <li
          className={`${
            activeTab === "streeview"
              ? "bg-white border-t border-r border-l -mb-px"
              : "dark:text-white"
          } px-4 text-gray-800 font-semibold py-2 rounded-t`}
        >
          <a
            href="#general"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("streeview");
            }}
          >
            Street View
          </a>
        </li>
        <li
          className={`${
            activeTab === "googlemap"
              ? "bg-white border-t border-r border-l -mb-px"
              : "dark:text-white"
          } px-4 text-gray-800 font-semibold py-2 rounded-t`}
        >
          <a
            href="#interior"
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("googlemap");
            }}
          >
            Google Map
          </a>
        </li>
      </ul>

      {/* Tab Contents */}
      <div id="tab-contents">
        <div className={`p-4 ${activeTab === "streeview" ? "" : "hidden"}`}>
          <div
            id="street-view"
            ref={streetViewRef}
            style={{ width: "100%", height: "520px" }}
          ></div>
        </div>
        <div className={`p-4 ${activeTab === "googlemap" ? "" : "hidden"}`}>
          <EmbedMap src={details.map_location} />
        </div>
      </div>
    </div>
  );
};

export default StreetView;
