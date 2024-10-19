"use client";

import { Nunito } from "next/font/google";
import React, { useState } from "react";

import { capitalizeFirstLetter } from "@/utils/stringValidators";

import LoadingWrapper from "@/components/custom/LoadingWrapper";
import Searchbar from "@/components/custom/Searchbar";

import { useGetVendorDataQuery } from "@/services/vendorAPI";

import type { BaseVendor } from "../types/vendor.types";
// import type { Vendor } from "../my-vendors/types/vendor.schema";
import { VendorTypes } from "../types/vendorFilter.types";

import VendorCard from "./vendorComponents/VendorCard";
import VendorFilter from "./vendorComponents/VendorFilter";
import VendorPagination from "./vendorComponents/VendorPagination";
import VendorPopover from "./vendorComponents/VendorPopover";

const nunito = Nunito({ subsets: ["latin"] });

interface VendorPageProps {
  currentVendor: keyof typeof VendorTypes;
  sanitizedFilterParams: string;
}

export const VendorPage = ({
  currentVendor,
  sanitizedFilterParams,
}: VendorPageProps) => {
  const currentVendorCapitalized = capitalizeFirstLetter(
    currentVendor as string,
  );
  const [filterParams, setFilterParams] = useState(sanitizedFilterParams);
  const [currPage, setCurrPage] = useState(1);

  const { data, isLoading, isError } = useGetVendorDataQuery({
    currentVendor,
    page: currPage,
    params: filterParams,
  });

  const totalPages = data?.total_pages ?? 0;
  const totalVendors = data?.total_vendors ?? 0;

  const vendorTypesData = VendorTypes[currentVendor];

  return (
    <div>
      <LoadingWrapper
        isError={isError}
        isLoading={isLoading}
        errorType="vendorNotFound"
      >
        <Searchbar
          className="my-[20px] w-3/4 mx-auto"
          placeholder="Search vendor names or locations..."
          onSearchChange={(value) => {
            const searchParams = new URLSearchParams(filterParams);
            searchParams.set("search", value);
            setFilterParams(searchParams.toString());
          }}
        />
        <div
          className={`bg-primary-foreground ${nunito.className} font-bold p-12`}
        >
          <h1 className="text-[65px] text-shadow-lg">
            Wedding {currentVendorCapitalized}
          </h1>
          <div className="flex justify-between">
            <h2 className="text-[20px] w-[500px]">
              {vendorTypesData.titleDescription}
            </h2>
            <div>
              <VendorPopover currentVendor={currentVendor} />
            </div>
          </div>
        </div>
        <VendorFilter
          currentVendor={currentVendor}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          setCurrentPage={setCurrPage}
        />
        {totalVendors !== 0 ? (
          <div>
            <div className="mt-6 mx-4  gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data?.vendors.map((vendor: BaseVendor) => (
                <div key={vendor.id} className="flex justify-center">
                  <VendorCard
                    vendorData={vendor}
                    currentVendor={currentVendor}
                  />
                </div>
              ))}
            </div>
            <div className="my-3 mx-4">
              <VendorPagination
                currPage={currPage}
                setCurrPage={setCurrPage}
                totalPages={totalPages}
                totalVendors={totalVendors}
              />
            </div>
          </div>
        ) : (
          <div className="h-[300px] w-full text-center mt-5">
            No Vendors available
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
};
