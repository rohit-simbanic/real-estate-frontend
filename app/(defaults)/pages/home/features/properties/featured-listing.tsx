import CommonListing from "./Listing-common";
import PropertyCard from "@/components/cards/property-card";

export default async function NewListing() {
  return (
    <>
      <CommonListing
        ItemComponent={PropertyCard}
        apiUrl="properties"
        onEdit={() => {}}
        title="Latest Pre-Construction Projects"
        status="featured"
      />
    </>
  );
}
