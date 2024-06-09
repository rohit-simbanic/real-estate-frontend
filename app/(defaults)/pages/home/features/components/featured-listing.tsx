"use client";
import PropertyCard from "@/components/cards/property-card";
import { Pagination } from "@/theme/components/pagination/pagination";
import SectionTitle from "@/theme/components/section-title/section-title";
import React, { useEffect, useState } from "react";
import { PropertyDetails } from "@/types/property-card-types";
import { fetchProperties } from "@/helpers/product-fetch";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";

interface FeaturedListingProps {
  onEdit: (id: string) => void;
}
const FeaturedListing: React.FC<FeaturedListingProps> = ({ onEdit }) => {
  const [property, setProperty] = useState<PropertyDetails[]>([]);
  console.log("featured property:", property);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(property.length / itemsPerPage);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading, logout } = useAuth();
  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    console.log("Starting useEffect hook boundary");
    const fetchData = async () => {
      setLoadingData(true);
      try {
        console.log("Inside useEffect hook boundary");
        const endpoint = isAuthenticated
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/my-properties`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/properties`;
        console.log("endpoint:", endpoint);
        const data = await fetchProperties(endpoint);
        const featuredProperties = data.filter(
          (item: PropertyDetails) => item.category === "featured"
        );
        setProperty(featuredProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoadingData(false);
      }
    };
    if (!loading) {
      fetchData();
    }
    console.log("End of useEffect hook boundary");
  }, [loading, logout]);

  const handleEdit = (propertyId: string) => {
    onEdit(propertyId);
  };

  const handleDelete = async (propertyId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/properties/${propertyId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete property");
        }
        setProperty((prevProperties) =>
          prevProperties.filter((prop) => prop.listing_id !== propertyId)
        );
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  const currentItems = property.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-4 my-10">
        <SectionTitle
          title="Featured Listings"
          description="Check New Listings"
        />
        {loadingData ? (
          <div className="w-full text-center">
            <p>Loading...</p>
          </div>
        ) : currentItems.length !== 0 ? (
          currentItems.map((item, index) => (
            <div
              key={index}
              className={`w-full ${
                pathname === "/admin"
                  ? "lg:w-full xl:w-1/3 "
                  : "xl:w-1/4 lg:w-1/3 md:w-1/2"
              } px-4 mb-8`}
            >
              <PropertyCard
                details={item}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={pathname === "/admin"}
              />
            </div>
          ))
        ) : (
          <div className=" max-h-14 container mx-auto">
            <h4 className="text-gray-600 dark:text-gray-100 text-center font-bold">
              No property listed by you yet!
            </h4>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </section>
  );
};

export default FeaturedListing;
