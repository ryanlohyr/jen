import React from "react";

import { formatRangeDisplay } from "../../vendors/vendorComponents/VendorFilterComponents/FilterHelper";

interface VendorCoreCardProps {
  className?: string;
  minValue: number;
  maxValue: number;
  svgValue: string;
  typeValue?: string;
  typeTitle: "Price Type" | "Capacity";
}
const VendorCoreCard = ({
  className,
  minValue,
  maxValue,
  svgValue,
  typeValue,
  typeTitle,
}: VendorCoreCardProps) => {
  if (!minValue && !maxValue) {
    return null;
  }

  const filter = {
    title: typeTitle,
    min: minValue,
    max: maxValue,
  };

  const display = formatRangeDisplay(filter);

  return (
    <div className={className}>
      <div className="flex font-bold mb-1">
        <img className="mr-1" src={svgValue} alt="Vendor" />
        <h1 className="mr-1">{typeTitle}:</h1>
        <span>{typeValue}</span>
      </div>
      <p>{display}</p>
    </div>
  );
};

export default VendorCoreCard;
