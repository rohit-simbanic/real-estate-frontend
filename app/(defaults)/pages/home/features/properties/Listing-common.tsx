"use client";
import PropertyCard from "@/components/cards/property-card";
import { Pagination } from "@/theme/components/pagination/pagination";
import SectionTitle from "@/theme/components/section-title/section-title";
import React, { ReactNode, useEffect, useState } from "react";
import { PropertyDetails } from "@/types/property-card-types";
// import { fetchProperties } from "@/helpers/product-fetch";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";
import { PreconstructedPropertyDetails } from "@/types/property-preconstructed-types";
import { fetchProperties } from "./actions";

export default function CommonListing({
  ItemComponent,
  onEdit,
  apiUrl,
  title,
  status,
}: {
  ItemComponent: any;
  onEdit: (id: string) => void;
  apiUrl: string;
  title: string;
  status: string;
}) {
  const [property, setProperty] = useState<
    PropertyDetails[] | PreconstructedPropertyDetails[]
  >([]);

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(property.length / itemsPerPage);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const endpoint = isAuthenticated ? `my-properties` : apiUrl;
        const data = await fetchProperties(endpoint);
        const featuredProperties = data.filter(
          (item: PropertyDetails) => item.category === status
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
  }, [loading, logout]);

  const handleDelete = async (propertyId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/${apiUrl}/${propertyId}`,
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

  const handleEdit = (propertyId: string) => {
    onEdit;
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      {" "}
      <section className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 my-10">
          <SectionTitle title={title} description="" />
          {loadingData ? (
            <div className="container">
              <div className="flex flex-wrap -mx-4 my-10">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className={`w-full ${
                      pathname === "/admin"
                        ? "lg:w-full xl:w-1/3 "
                        : "xl:w-1/4 lg:w-1/3 md:w-1/2"
                    } px-4 mb-8`}
                    key={index}
                  >
                    <div key={index} className="border border-gray-200 p-4">
                      <div className="animate-pulse space-y-2">
                        <div className="bg-gray-200 h-48"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-16 bg-gray-200 w-full"></div>
                          <div className="space-x-2 flex">
                            <div className="h-8 bg-gray-200 w-full"></div>
                            <div className="h-8 bg-gray-200 w-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                <ItemComponent
                  key={index}
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
                No property listed yet!
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
    </>
  );
}
