import CommonListing from "./Listing-common";
import PropertyCard from "@/components/cards/property-card";

export default async function FeaturedListing({
  onEdit,
}: {
  onEdit: (id: string) => void;
}) {
  return (
    <>
      <CommonListing
        ItemComponent={PropertyCard}
        apiUrl="properties"
        onEdit={onEdit}
        title="Latest Pre-Construction Projects"
        status="featured"
      />
    </>
  );
}
