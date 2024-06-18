import ButtonRegister from "@/components/button/button-register";
import { getCloudinaryUrl } from "@/helpers/cloudinary-image-fetch";
import { truncateText } from "@/helpers/utils";
import { PropertyDetails } from "@/types/property-card-types";
import { PreconstructedPropertyDetails } from "@/types/property-preconstructed-types";
import Image from "next/image";
import CommonListing from "./Listing-common";

interface PropertyCardProps {
  details: PreconstructedPropertyDetails;
  index: number;
  onEdit?: (propertyId: string) => void;
  onDelete?: (propertyId: string) => void;
  isAdmin: boolean;
}
function PreConstructedCard({
  details,
  index,
  onEdit = () => {},
  onDelete = () => {},
  isAdmin,
}: PropertyCardProps) {
  return (
    <div className="rounded overflow-hidden shadow-lg hover:shadow-xl dark:bg-gray-900">
      <Image
        src={
          details.property_images.length > 0
            ? getCloudinaryUrl(details.property_images[0]?.filename)
            : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
        }
        alt="Property Image"
        width={600}
        height={300}
        layout="responsive"
        className="!h-[310px]"
        priority
      />
      <div className="px-4 py-4">
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-teal-600 pb-3">
            {/* {truncateText(details?.name, 21)} */}
          </h2>
          <p className="dark:text-teal-600 my-2 text-sm h-[53px]">
            {details.general_details.Address}
          </p>
          <ButtonRegister href={`${details.listing_id}`} text={"Read More"} />
          {isAdmin && (
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => onEdit(details.listing_id)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(details.listing_id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PreConstructedListing() {
  return (
    <>
      <CommonListing
        ItemComponent={PreConstructedCard}
        apiUrl="pre-constructed-property"
        onEdit={() => ({})}
        title="Latest Pre-Construction Projects"
        status="pre-constructed"
      />
    </>
  );
}
