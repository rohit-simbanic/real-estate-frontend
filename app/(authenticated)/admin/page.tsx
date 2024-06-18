"use client";
import FeaturedListing from "@/app/(defaults)/pages/home/features/components/featured-listing";
import SoldProperties from "@/app/(defaults)/pages/home/features/components/sold-properties";
import PreConstructedProject from "@/app/(defaults)/pages/home/features/components/pre-constructed-project";
import withAuth from "@/helpers/with-auth-hoc";
import PreConstructedPropertyForm from "@/theme/components/form/pre-constructed-property-create";
import PropertyForm from "@/theme/components/form/property-create";
import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [activePreconstructedSubTab, setActivePreconstructedSubTab] =
    useState(0);
  const [propertyId, setPropertyId] = useState<string | null>(null);

  const handleEdit = (id: string, tab: number) => {
    setPropertyId(id);
    setActiveTab(tab);
    setActiveSubTab(tab);
    setActivePreconstructedSubTab(0);
  };
  const handleCloseProperty = () => {
    setPropertyId(null);
    setActiveSubTab(1);
  };
  const handleClosePreconstructed = () => {
    setPropertyId(null);
    setActivePreconstructedSubTab(1);
  };
  const tabs = [
    {
      name: "Featured/Sold Property",
      icon: (
        <svg
          className="w-4 h-4 me-2 text-gray-500 dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      ),
      content: (
        <>
          {/* Sub-tabs for Featured/Sold Property */}
          <ul className="flex max-sm:flex-col max-sm:justify-center max-sm:items-center space-x-4 mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSubTab(0);
                  setPropertyId(null);
                }}
                className={`inline-flex items-center px-4 py-3 rounded-lg ${
                  activeSubTab === 0
                    ? "text-white bg-blue-700 dark:bg-blue-600"
                    : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white border"
                }`}
                aria-current={activeSubTab === 0 ? "page" : undefined}
              >
                Create Featured/Sold Properties
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSubTab(1);
                  setPropertyId(null);
                }}
                className={`inline-flex items-center px-4 py-3 rounded-lg ${
                  activeSubTab === 1
                    ? "text-white bg-blue-700 dark:bg-blue-600"
                    : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white border"
                }`}
                aria-current={activeSubTab === 1 ? "page" : undefined}
              >
                Featured Property Lists
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSubTab(2);
                  setPropertyId(null);
                }}
                className={`inline-flex items-center px-4 py-3 rounded-lg ${
                  activeSubTab === 2
                    ? "text-white bg-blue-700 dark:bg-blue-600"
                    : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white border"
                }`}
                aria-current={activeSubTab === 2 ? "page" : undefined}
              >
                Sold Property Lists
              </a>
            </li>
          </ul>
          {/* Content based on active sub-tab */}
          {activeSubTab === 0 && (
            <PropertyForm
              propertyId={propertyId}
              onClose={handleCloseProperty}
            />
          )}
          {activeSubTab === 1 && (
            <FeaturedListing onEdit={(id: string) => handleEdit(id, 0)} />
          )}
          {activeSubTab === 2 && <SoldProperties />}
        </>
      ),
    },
    {
      name: "Pre-Constructed Property",
      icon: (
        <svg
          className="w-4 h-4 me-2 text-gray-500 dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
        </svg>
      ),
      content: (
        <>
          {/* Sub-tabs for Pre-Constructed Property */}
          <ul className="flex space-x-4 mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePreconstructedSubTab(0);
                  setPropertyId(null);
                }}
                className={`inline-flex items-center px-4 py-3 rounded-lg ${
                  activePreconstructedSubTab === 0
                    ? "text-white bg-blue-700 dark:bg-blue-600"
                    : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white border"
                }`}
                aria-current={
                  activePreconstructedSubTab === 0 ? "page" : undefined
                }
              >
                Create Pre-constructed Properties
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePreconstructedSubTab(1);
                  setPropertyId(null);
                }}
                className={`inline-flex items-center px-4 py-3 rounded-lg ${
                  activePreconstructedSubTab === 1
                    ? "text-white bg-blue-700 dark:bg-blue-600"
                    : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white border"
                }`}
                aria-current={
                  activePreconstructedSubTab === 1 ? "page" : undefined
                }
              >
                Pre-constructed Property Lists
              </a>
            </li>
          </ul>
          {/* Content based on active sub-tab */}
          {activePreconstructedSubTab === 0 && (
            <PreConstructedPropertyForm
              propertyId={propertyId}
              onClose={handleClosePreconstructed}
            />
          )}
          {activePreconstructedSubTab === 1 && (
            <PreConstructedProject onEdit={(id: string) => handleEdit(id, 1)} />
          )}
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="lg:flex">
        <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          {tabs.map((tab, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(index);
                  setPropertyId(null);
                  setActiveSubTab(0);
                }}
                className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                  activeTab === index
                    ? "text-white bg-blue-700 dark:bg-blue-600"
                    : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                aria-current={activeTab === index ? "page" : undefined}
              >
                {tab.icon}
                {tab.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Page);
