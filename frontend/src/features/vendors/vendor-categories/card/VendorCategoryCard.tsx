import Link from "next/link";
import React from "react";

import { capitalizeFirstLetter } from "@/utils/stringValidators";

import { Button } from "@/components/ui/button";
import ImageCarousel from "@/components/custom/ImageCarousel";

import type { BaseVendor } from "../../types/vendor.types";

interface VendorCategoryCardProps {
  vendorType: string;
  showcaseVendorData: BaseVendor;
}

// This is the card used in /vendor
const VendorCategoryCard = ({
  vendorType,
  showcaseVendorData,
}: VendorCategoryCardProps) => {
  const capitalizedVendor = capitalizeFirstLetter(vendorType);
  return (
    <div className="w-[280px] justify-center items-center flex flex-col bg-primary-foreground p-4 rounded-lg">
      <h1>{capitalizedVendor}</h1>
      <ImageCarousel images={showcaseVendorData.photos} />
      <div className="text-center items-center justify-between h-[60px]">
        <h1 className="mt-2">{showcaseVendorData.name}</h1>
        <p>
          {showcaseVendorData.min_price !== null &&
            `From $${showcaseVendorData.min_price}`}
          {showcaseVendorData.min_price !== null &&
            showcaseVendorData.rating !== null &&
            " | "}
          {showcaseVendorData.rating !== null &&
            `${showcaseVendorData.rating}/5`}
          {showcaseVendorData.rating_count !== null &&
            ` (${showcaseVendorData.rating_count} Reviews)`}
        </p>
      </div>
      <Link href={`/vendors/${vendorType}`}>
        <Button>More {capitalizedVendor}</Button>
      </Link>
    </div>
  );
};

export default VendorCategoryCard;
