/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

import type {
  Filter,
  VendorFiltersProp,
} from "@/features/vendors/types/vendorFilter.types";

import FilterCheckbox from "./FilterCheckbox";
import FilterRange from "./FilterRange";

interface FilterManagerProps {
  vendorFilter: Filter;
  filterSettings: VendorFiltersProp;
  handleOptionToggle: (filterTitle: string, option: string) => void;
  setFilterSettings: React.Dispatch<React.SetStateAction<VendorFiltersProp>>;
  setFilterParams: (params: string) => void;
}

export const FilterManager = ({
  vendorFilter,
  filterSettings,
  handleOptionToggle,
  setFilterSettings,
  setFilterParams,
}: FilterManagerProps) => {
  switch (vendorFilter.type) {
    case "checkbox": {
      const filterObject: { [key: string]: any } = filterSettings;
      const options = filterObject[vendorFilter.title]?.options || [];
      return (
        <FilterCheckbox
          key={vendorFilter.title}
          title={vendorFilter.title}
          options={vendorFilter.options}
          selectedOptions={options}
          onOptionToggle={handleOptionToggle}
        />
      );
    }
    case "range": {
      const filterObject: { [key: string]: any } = filterSettings;
      const min = filterObject[vendorFilter.title]?.min;
      const max = filterObject[vendorFilter.title]?.max;
      return (
        <FilterRange
          key={vendorFilter.title}
          title={vendorFilter.title}
          currMin={min}
          currMax={max}
          setFilterSettings={setFilterSettings}
        />
      );
    }

    default:
      return null;
  }
};
