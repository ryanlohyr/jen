import { Dot } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { formatPriceToThousand } from "@/utils/stringValidators";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageCarousel from "@/components/custom/ImageCarousel";

import type { BaseVendor } from "../../types/vendor.types";
import type { VendorTypes } from "../../types/vendorFilter.types";
import DiamondComponent from "./DiamondComponent";

import useVendorLike from "@/hooks/vendors/useVendorLike";

interface VendorCardProps {
  vendorData: BaseVendor;
  currentVendor: keyof typeof VendorTypes;
}

// This is the card used in /vendor/<category>
const VendorCard = ({ vendorData, currentVendor }: VendorCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { isLiked, pressLikeButton } = useVendorLike({
    vendorData,
  });

  return (
    <div className="w-[360px] lg:min-w-[258px] lg:w-[280px] justify-center items-center flex flex-col bg-primary-foreground p-4 rounded-lg">
      <ImageCarousel
        images={vendorData.photos}
        pressLikeButton={pressLikeButton}
        isLiked={isLiked}
        hasLikeButton
      />
      <Link
        className="cursor-pointer w-full"
        href={`details/${vendorData.name}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full">
          <h1
            className={`${
              isHovered ? "underline " : ""
            } font-vollkorn font-semibold text-md truncate mt-2`}
          >
            {vendorData.name}
          </h1>
          <div className="flex flex-wrap">
            {vendorData.card_descriptions?.map((description, index) => (
              <div className="text-center flex items-center" key={index}>
                <p className="text-xs whitespace-nowrap">{description}</p>
                {index !== vendorData.card_descriptions.length - 1 && (
                  <Dot className="inline-block" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div>
              {vendorData.min_price && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <p className="text-sm font-bold">
                        Starts at {formatPriceToThousand(vendorData.min_price)}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      {/* Base Price is fall backvalue */}
                      {vendorData.price_type || "Base Price"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="text-xs inline-flex items-center justify-center rounded-lg p-1.5 ">
              <DiamondComponent
                rating={vendorData.rating}
                ratingCount={vendorData.rating_count}
                size="0.75rem"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VendorCard;
