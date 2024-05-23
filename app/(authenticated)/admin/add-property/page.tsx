import React from "react";
import dynamic from "next/dynamic";
const DynamicComponent = dynamic(
  () => import("@/theme/components/form/property-create"),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <div>
      <DynamicComponent />
    </div>
  );
};

export default page;
