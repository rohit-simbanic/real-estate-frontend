import FeaturedListing from "@/pages/home/features/components/featured-listing";
import PreConstructedProject from "@/pages/home/features/components/pre-constructed-project";
import SoldProperties from "@/pages/home/features/components/sold-properties";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto">
      <h1>Admin</h1>
      <div className="flex gap-2 flex-col">
        <Link href={"/admin/add-property"} className="font-bold">
          Add Featured/sold Property
        </Link>
        <Link
          href={"/admin/add-pre-constructed-property"}
          className="font-bold"
        >
          Add Preconstructed Property
        </Link>
        <FeaturedListing />
        <SoldProperties />
        <PreConstructedProject />
      </div>
    </div>
  );
};

export default page;
