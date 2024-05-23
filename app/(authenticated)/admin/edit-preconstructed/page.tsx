// @ts-nocheck

import React from "react";
import dynamic from "next/dynamic";
const DynamicComponents = dynamic(
  () => import("@/theme/components/form/edit-preconstructed"),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <div>
      <DynamicComponents />
    </div>
  );
};

export default page;
