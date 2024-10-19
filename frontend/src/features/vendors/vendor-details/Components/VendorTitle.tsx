import React from "react";

import FilledHeart from "@/components/icons/FilledHeart";
import TransparentHeart from "@/components/icons/TransparentHeart";

import type { BaseVendor } from "../../types/vendor.types";

import useVendorLike from "@/hooks/vendors/useVendorLike";

interface VendorTitleProps {
  name: string;
  location: string;
  vendorData: BaseVendor;
}

export function VendorTitle({ name, location, vendorData }: VendorTitleProps) {
  const { isLiked: isLikedState, pressLikeButton } = useVendorLike({
    vendorData,
  });

  return (
    <div className="w-full mt-8 mb-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex  items-start flex-col mb-1 md:mb-4">
          <h1 className="font-bold text-3xl mb-0.5 ">{name}</h1>
          <p className="text-[#818181] underline"> {location}</p>
        </div>
        <div className="flex items-center mb-3">
          {isLikedState ? (
            <button
              className="flex gap-1 hover:underline"
              type="button"
              onClick={pressLikeButton}
            >
              <FilledHeart disableHovering />
              Saved
            </button>
          ) : (
            <button
              className="flex gap-1 hover:underline"
              type="button"
              onClick={pressLikeButton}
            >
              <TransparentHeart disableHovering />
              Save
            </button>
          )}
        </div>
      </div>
      <hr className="w-full border-[#888888] mb-2" />
    </div>
  );
}
