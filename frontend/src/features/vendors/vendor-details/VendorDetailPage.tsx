"use client";

import React from "react";

import LoadingWrapper from "@/components/custom/LoadingWrapper";

import { useGetVendorDetailQuery } from "@/services/vendorAPI";

import { VendorTypes } from "../types/vendorFilter.types";

import { VendorAboutUs } from "./Components/VendorAboutUs";
import VendorCoreInfo from "./Components/VendorCoreInfo";
import VendorExtraInfo from "./Components/VendorExtraInfo";
import { VendorImageBanner } from "./Components/VendorImageBanner";
import VendorNav from "./Components/VendorNav";
import { VendorPackages } from "./Components/VendorPackages";
import { VendorServices } from "./Components/VendorServices";
import { VendorTitle } from "./Components/VendorTitle";

// import type { Vendor } from "../my-vendors/types/vendor.schema";

interface VendorDetailPageProps {
  vendor_name: string;
}

export const VendorDetailPage = ({ vendor_name }: VendorDetailPageProps) => {
  const {
    data: vendorData,
    isLoading,
    isError,
  } = useGetVendorDetailQuery(vendor_name);

  const unsanitizedVendor: string = vendorData ? vendorData.vendor_type : "";

  const hasMatch = Object.keys(VendorTypes).some((key) => {
    return key === unsanitizedVendor;
  });

  const sanitizedVendor = unsanitizedVendor as keyof typeof VendorTypes;

  return (
    <div className="lg:w-[80%] flex items-center justify-center mx-auto">
      <LoadingWrapper
        isError={isError || !hasMatch || typeof unsanitizedVendor === "number"}
        isLoading={isLoading || !vendorData}
        errorType="vendorNotFound"
      >
        {vendorData ? (
          <div className=" px-6 flex flex-col items-center justify-center">
            <VendorNav
              vendorName={vendorData.name}
              vendorType={sanitizedVendor}
            />
            <VendorImageBanner photos={vendorData.photos} />
            <VendorTitle
              vendorData={vendorData}
              name={vendorData.name}
              location={vendorData.address}
            />
            <VendorCoreInfo vendorData={vendorData} />
            <VendorAboutUs
              aboutUsContent={vendorData.description}
              companyLogo={
                vendorData.photos.length > 0
                  ? vendorData.photos[vendorData.photos.length - 1].src
                  : ""
              } // Make the last photo the logo haha
              facebook={vendorData.facebook}
              instagram={vendorData.instagram}
              website={vendorData.website}
            />
            <VendorPackages packages={vendorData.packages} />
            <VendorExtraInfo extraInfo={vendorData.extra_filters} />
            <VendorServices services={vendorData.services} />
          </div>
        ) : null}
      </LoadingWrapper>
    </div>
  );
};
