import CommonListing from "./Listing-common";
import PropertyCard from "@/components/cards/property-card";

export default async function SoldLProperties() {
  return (
    <>
      <CommonListing
        ItemComponent={PropertyCard}
        apiUrl="properties"
        onEdit={() => ({})}
        title="Sold Properties"
        status="sold"
      />
    </>
  );
}
