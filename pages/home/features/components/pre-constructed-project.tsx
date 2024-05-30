"use client";

import ButtonRegister from "@/components/button/button-register";
import { fetchPreconstructedProperties } from "@/helpers/product-fetch";
import { Pagination } from "@/theme/components/pagination/pagination";
import SectionTitle from "@/theme/components/section-title/section-title";
import { Property } from "@/types/constructed-property-card-types";
import { PropertyDetails } from "@/types/property-card-types";
import { PreconstructedPropertyDetails } from "@/types/property-preconstructed-types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PreConstructedProject = () => {
  const [propertyItem, setPropertyItem] = useState<
    PreconstructedPropertyDetails[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(propertyItem.length / itemsPerPage);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint =
          pathname === "/admin"
            ? "http://localhost:5000/my-properties"
            : "http://localhost:5000/pre-constructed-property";
        const data = await fetchPreconstructedProperties(endpoint);
        const featuredProperties = data.filter(
          (item: PreconstructedPropertyDetails) =>
            item.category === "pre-constructed"
        );
        setPropertyItem(featuredProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname]);
  const handleEdit = (property: PropertyDetails) => {
    router.push(`/admin/edit-preconstructed?propertyId=${property.listing_id}`);
  };

  const handleDelete = async (propertyId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/pre-constructed-property/${propertyId}`,
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
      setPropertyItem((prevProperties) =>
        prevProperties.filter((prop) => prop.listing_id !== propertyId)
      );
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };
  const currentItems = propertyItem.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-4 my-10">
        <SectionTitle
          title="Latest Pre-Construction Projects"
          description="CLICK ON IMAGES FOR MORE DETAILS"
        />
        {loading ? (
          <div className="w-full text-center">
            <p>Loading...</p>
          </div>
        ) : (
          currentItems.map((card, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8"
            >
              <div className="rounded overflow-hidden shadow-lg hover:shadow-xl dark:bg-gray-900">
                <Image
                  src={`http://localhost:5000/uploads/${card.property_images[0].filename}`}
                  alt="Property Image"
                  width={600}
                  height={300}
                  layout="responsive"
                  className="!h-[300px]"
                />
                <div className="px-4 py-4">
                  <div className="mb-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-teal-600 pb-3">
                      {card.name}
                    </h2>
                    <p className="dark:text-teal-600 my-2 text-sm h-[53px]">
                      {card.general_details.Address}
                    </p>
                    <ButtonRegister
                      href={`${card.listing_id}`}
                      text={"Register"}
                    />
                    {pathname === "/admin" && (
                      <div className="flex justify-end mt-4 space-x-2">
                        <button
                          onClick={() => handleEdit(card)}
                          className="text-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(card.listing_id)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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

export default PreConstructedProject;
