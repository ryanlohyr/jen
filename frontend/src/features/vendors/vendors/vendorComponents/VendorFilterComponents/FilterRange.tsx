import { DollarSign } from "lucide-react";
import React, { useEffect, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { VendorFiltersProp } from "../../../types/vendorFilter.types";

interface FilterRangeProps {
  setFilterSettings: React.Dispatch<React.SetStateAction<VendorFiltersProp>>;
  currMin: number | null;
  currMax: number | null;
  title: string;
}

const FilterRange = ({
  setFilterSettings,
  currMin,
  currMax,
  title,
}: FilterRangeProps) => {
  const [minValue, setMinValue] = useState<number | null>(currMin);
  const [maxValue, setMaxValue] = useState<number | null>(currMax);
  const [minValueError, setMinValueError] = useState<string | null>();
  const [open, setOpen] = useState(false);
  const handleValueChange = (
    type: "min" | "max",
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const rawValue = event.target.value;
    const value = Number(rawValue);

    if (rawValue === "") {
      if (type === "min") {
        setMinValue(null);
      } else {
        setMaxValue(null);
      }
      return;
    }

    if (!Number.isNaN(value)) {
      if (type === "min") {
        setMinValue(value);
      } else {
        setMaxValue(value);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "-") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (minValue != null && maxValue != null && minValue >= maxValue) {
      setMinValueError(`Min ${title} should be less than max ${title}`);
    } else {
      setMinValueError(null);
    }
  }, [minValue, maxValue]);

  const resetFilters = () => {
    setMinValue(null);
    setMaxValue(null);
    setMinValueError(null);
  };

  const handleButtonPressed = () => {
    if ((!minValue && !maxValue) || minValueError) {
      if (!minValueError) {
        setMinValueError(`Please enter a valid min and max ${title}`);
      }
      return;
    }

    setFilterSettings((prevSettings: VendorFiltersProp) => {
      const newSettings = {
        ...prevSettings,
        [title]: {
          ...prevSettings[title],
          min: minValue,
          max: maxValue,
        },
      };
      return newSettings;
    });

    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-3xl">
          <div className="flex">
            {title}
            <ChevronDownIcon className="ml-2 mt-[2px] h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-4 flex flex-col space-y-4">
        <div className="flex justify-between gap-5">
          <div>
            <p className="block text-sm font-medium text-gray-700">
              Min {title}
            </p>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-grey-600">
              <div className="p-2">
                {title === "Price" ? (
                  <DollarSign className="ml-2 mt-[2px] h-5 w-5" />
                ) : null}
              </div>

              <input
                type="number"
                className="w-[160px] block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 overflow-hidden whitespace-nowrap text-overflow-ellipsis"
                placeholder="Enter a number"
                value={minValue !== null ? minValue : ""}
                onChange={(event) => handleValueChange("min", event)}
                onKeyDown={handleKeyDown}
                data-testid="min"
              />
            </div>
            <p className="text-red-500">{minValueError}</p>
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-700">
              Max {title}
            </p>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-grey-600">
              <div className="p-2">
                {title === "Price" ? (
                  <DollarSign className="ml-2 mt-[2px] h-5 w-5" />
                ) : null}
              </div>
              <input
                type="number"
                className=" w-[160px] block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 overflow-hidden whitespace-nowrap text-overflow-ellipsis"
                placeholder="Enter a number"
                value={maxValue !== null ? maxValue : ""}
                onChange={(event) => handleValueChange("max", event)}
                onKeyDown={handleKeyDown}
                data-testid="max"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
          <Button onClick={handleButtonPressed}>Done</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterRange;
