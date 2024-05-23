"use client";
import PropertyCard from "@/components/cards/property-card";
import { Pagination } from "@/theme/components/pagination/pagination";
import SectionTitle from "@/theme/components/section-title/section-title";
import React, { useEffect, useState } from "react";
import { PropertyDetails } from "@/types/property-card-types";
import { fetchProperties } from "@/helpers/product-fetch";
import { usePathname, useRouter } from "next/navigation";

const FeaturedListing = () => {
  const [property, setProperty] = useState<PropertyDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(property.length / itemsPerPage);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint =
          pathname === "/admin"
            ? "https://backend-real-estate-m1zm.onrender.com/my-properties"
            : "https://backend-real-estate-m1zm.onrender.com/properties";
        const data = await fetchProperties(endpoint);
        const featuredProperties = data.filter(
          (item: PropertyDetails) => item.category === "featured"
        );
        setProperty(featuredProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname]);
  const handleEdit = (property: PropertyDetails) => {
    router.push(`/admin/edit-property?propertyId=${property.listing_id}`);
  };

  const handleDelete = async (propertyId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://backend-real-estate-m1zm.onrender.com/properties/${propertyId}`,
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
        {loading ? (
          <div className="w-full text-center">
            <p>Loading...</p>
          </div>
        ) : (
          currentItems.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
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
