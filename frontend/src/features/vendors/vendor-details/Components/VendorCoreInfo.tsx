import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { BaseVendor } from "../../types/vendor.types";
import DiamondComponent from "../../vendors/vendorComponents/DiamondComponent";
import VendorCoreCard from "./VendorCoreCard";

interface VendoreCoreInfoProps {
  vendorData: BaseVendor;
}

const VendorCoreInfo = ({ vendorData }: VendoreCoreInfoProps) => {
  const hasGooogleInfo =
    vendorData.rating && vendorData.rating_count && vendorData.google_maps_uri;
  return (
    <div className="w-full mb-5">
      {hasGooogleInfo ? (
        <div className="mb-3">
          <div>
            <h1 className="font-bold mb-1"> Google Reviews:</h1>
            <DiamondComponent
              rating={vendorData.rating}
              ratingCount={vendorData.rating_count}
            />
          </div>
          <Link
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noreferrer"
            href={vendorData.google_maps_uri || ""}
          >
            View on Google Maps
          </Link>
        </div>
      ) : null}
      <div className="mb-4">
        {vendorData.email || vendorData.phone_number ? (
          <div className="flex font-bold">
            <h1 className="mr-1">Contact Details:</h1>
          </div>
        ) : null}
        {vendorData.email && (
          <div className="mb-0.5">
            <p className="font-bold mr-1">Email:</p>
            <p>{vendorData.email}</p>
          </div>
        )}
        {vendorData.phone_number && (
          <div>
            <p className="font-bold mr-1">Phone Contact:</p>
            {/* Displayed as markdown as we may display more than one phone number */}
            <Markdown className="prose" remarkPlugins={[remarkGfm]}>
              {vendorData.phone_number}
            </Markdown>
          </div>
        )}
      </div>

      <VendorCoreCard
        className="mb-4"
        typeTitle="Price Type"
        typeValue={vendorData.price_type}
        minValue={vendorData.min_price}
        maxValue={vendorData.max_price}
        svgValue="/dollar-square.svg"
      />
      <VendorCoreCard
        className="mb-2"
        typeTitle="Capacity"
        minValue={vendorData.min_capacity}
        maxValue={vendorData.max_capacity}
        svgValue="/people.svg"
      />
    </div>
  );
};

export default VendorCoreInfo;
