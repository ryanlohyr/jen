import Link from "next/link";
import React from "react";

import { VendorTypes } from "../../types/vendorFilter.types";

interface VendorNavProps {
  vendorType: keyof typeof VendorTypes;
  vendorName: string;
}

const VendorNav = ({ vendorType, vendorName }: VendorNavProps) => {
  const label = VendorTypes[vendorType].title;
  const linkMap = [
    { label: "Vendors", link: "/vendors" },
    { label, link: `/vendors/${vendorType}` },
    { label: vendorName, link: null },
  ];
  return (
    <div className="w-full text-md flex gap-1.5 my-2">
      {linkMap.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && " / "}
          {item.link ? (
            <Link className="underline" href={item.link}>
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default VendorNav;
