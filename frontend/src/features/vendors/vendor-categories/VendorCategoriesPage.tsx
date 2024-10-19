"use client";

import React from "react";

import type {
  VendorCategory,
  VendorMarketPlaceProps,
} from "../types/vendor.types";

import VendorCategoryCard from "./card/VendorCategoryCard";
import Hero from "./hero/Hero";

interface MarketplaceProps {
  vendorData: VendorMarketPlaceProps;
}

export const Marketplace = ({ vendorData }: MarketplaceProps) => {
  return (
    <div>
      <Hero />
      <div className="mt-8 flex justify-center items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vendorData.vendors.map((vendor: VendorCategory) => {
            return (
              <div key={vendor.category_name} className="flex justify-center">
                <VendorCategoryCard
                  vendorType={vendor.category_name}
                  showcaseVendorData={vendor.vendor}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
