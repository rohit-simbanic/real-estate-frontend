import { getCloudinaryUrl } from "@/helpers/cloudinary-image-fetch";
import { PropertyDetails } from "@/types/property-card-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PropertyCardProps {
  details: PropertyDetails;
  index: number;
  onEdit?: (propertyId: string) => void;
  onDelete?: (propertyId: string) => void;
  isAdmin: boolean;
}
const ParkingIcon = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
  />
);

const BathroomIcon = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
  />
);

const BedroomIcon = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  />
);
const PropertyCard: React.FC<PropertyCardProps> = ({
  details,
  index,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  const handleEdit = () => {
    if (onEdit) onEdit(details.listing_id);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(details.listing_id);
  };
  return (
    <div className="block rounded-lg p-4 dark:shadow-none shadow-sm shadow-indigo-100 bg-[#fff8f8] dark:bg-gray-900">
      <Link href={details.listing_id}>
        <Image
          alt="Property image"
          src={
            details.property_images.length > 0
              ? getCloudinaryUrl(details.property_images[0]?.filename)
              : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
          }
          className=" w-full rounded-md object-cover !h-[310px]"
          width={1770}
          height={700}
          priority
        />

        <div className="mt-2">
          <dl>
            <div>
              <dt className="sr-only">Price</dt>
              <dd className="text-sm text-gray-500">{details.price}</dd>

              <div className="rounded-full bg-yellow-500 py-1 px-2 text-xs font-medium text-white w-16 my-3 flex items-center justify-center">
                {details.category}
              </div>
            </div>
            <div>
              <dt className="sr-only">Address</dt>
              <dd className="font-medium dark:text-teal-600 h-[53px]">
                {details.general_details.Address}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-4 text-xs">
            <Feature
              iconColor="text-indigo-700"
              featureName="Kitchen"
              value={`${details.room_interior.Kitchens} room`}
              Icon={BathroomIcon}
            />
            <Feature
              iconColor="text-indigo-700"
              featureName="Bedroom"
              value={`${details.room_interior.Bedrooms} room`}
              Icon={BedroomIcon}
            />
          </div>
        </div>
      </Link>
      {isAdmin && (
        <div className="flex justify-end mt-4 space-x-2">
          {details.category != "sold" && (
            <button onClick={handleEdit} className="text-blue-500">
              Edit
            </button>
          )}

          <button onClick={handleDelete} className="text-red-500">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;

const Feature = ({
  iconColor,
  featureName,
  value,
  Icon,
}: {
  iconColor: string;
  featureName: string;
  value: string;
  Icon: React.ElementType;
}) => (
  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
    <svg
      className={`h-4 w-4 ${iconColor}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <Icon />
    </svg>
    <div className="mt-1.5 sm:mt-0">
      <p className="text-gray-500">{featureName}</p>
      <p className="font-medium dark:text-teal-600">{value}</p>
    </div>
  </div>
);
