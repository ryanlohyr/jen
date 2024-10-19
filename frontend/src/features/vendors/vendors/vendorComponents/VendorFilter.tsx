/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type {
  CheckboxFilter,
  Filter,
  RangeFilter,
  VendorFiltersProp,
} from "../../types/vendorFilter.types";
import { VendorTypes } from "../../types/vendorFilter.types";

import Filterbox from "./VendorFilterComponents/Filterbox";
import {
  formatQuery,
  formatRangeDisplay,
  parseRangeValue,
} from "./VendorFilterComponents/FilterHelper";
import { FilterManager } from "./VendorFilterComponents/FilterManager";

interface VendorFilterProps {
  currentVendor: keyof typeof VendorTypes;
  filterParams: string;
  setFilterParams: (params: string) => void;
  setCurrentPage: (page: number) => void;
}

const VendorFilter = ({
  currentVendor,
  filterParams,
  setFilterParams,
  setCurrentPage,
}: VendorFilterProps) => {
  const [filterSettings, setFilterSettings] = useState({});

  /**
   * Initializes filter settings based on the current vendor's filters and query parameters.
   *
   * @param resetFilters - A boolean flag indicating whether to reset the filters to their default values. Default is false.
   *
   * This function initializes the filter settings for the current vendor by parsing the query parameters and
   * setting the initial values for each filter based on the type (checkbox or range).
   *
   * It uses the global variable `filterParams` to get the current URL search parameters and the global variable `currentVendor`
   * to get the relevant filters from the `VendorTypes` object.
   *
   * The initialized filter settings are then set to the state using `setFilterSettings`, and the query parameters are cleared using `setFilterParams`.
   */

  const initializeFilterSettings = (resetFilters: boolean = false) => {
    const filters = VendorTypes[currentVendor]?.filters || [];
    const initialSettings: VendorFiltersProp = {};

    const params = new URLSearchParams(filterParams);
    const parsedParams: { [key: string]: string[] } = {};

    params.forEach((value, key) => {
      if (!parsedParams[key]) {
        parsedParams[key] = [];
      }
      parsedParams[key].push(value);
    });

    filters.forEach((filter: Filter) => {
      if (filter.type === "checkbox") {
        // Initialize options based on filterParams unless resetFilters is true
        const options = resetFilters ? [] : parsedParams[filter.value] || [];

        initialSettings[filter.title] = {
          type: filter.type,
          title: filter.title,
          value: filter.value,
          options,
        } as CheckboxFilter;
      } else if (filter.type === "range") {
        const min = parseRangeValue(
          parsedParams,
          `min_${filter.value}`,
          resetFilters,
        );
        const max = parseRangeValue(
          parsedParams,
          `max_${filter.value}`,
          resetFilters,
        );
        initialSettings[filter.title] = {
          type: filter.type,
          title: filter.title,
          value: filter.value,
          min,
          max,
        } as RangeFilter;
      }
    });
    setFilterSettings(initialSettings);
    setFilterParams("");
  };

  useEffect(() => {
    // Update the URL whenever filterParams change
    const params = new URLSearchParams(filterParams).toString();
    const newUrl = `${window.location.pathname}?${params}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }, [filterParams]);

  useEffect(() => {
    initializeFilterSettings();
  }, [currentVendor]);

  // Update the query string whenever the filter settings change
  useEffect(() => {
    console.log("filterSettings", filterSettings);
    setFilterParams(formatQuery(filterSettings));
    setCurrentPage(1);
  }, [filterSettings]);

  /**
   * Toggles the selection of an option for a checkbox filter and updates the filter settings state.
   *
   * @param filterTitle - The title of the filter to update.
   * @param option - The option to toggle in the filter's options list.
   *
   * This function is used to update the options of a checkbox filter based on user interaction.
   * It checks if the option is already selected; if it is, the option is removed from the list.
   * Otherwise, the option is added to the list. The updated filter settings are then set to the state.
   */

  const handleOptionToggle = (filterTitle: string, option: string) => {
    setFilterSettings((prevSettings: VendorFiltersProp) => {
      const currentFilter = prevSettings[filterTitle];

      if (currentFilter.type === "range" || !option) {
        return prevSettings;
      }

      let newSettings = { ...prevSettings };
      const isSelected = currentFilter?.options?.includes(option);

      // Create a new list of options based on whether the option is already selected
      const newOptions = isSelected
        ? currentFilter.options.filter((item) => item !== option)
        : [...(currentFilter?.options || []), option];

      newSettings = {
        ...prevSettings,
        [filterTitle]: {
          ...currentFilter,
          options: newOptions,
        },
      };
      // Return new state with updated options for this specific filter
      return newSettings;
    });
  };

  /**
   * Handles the removal of an option or entire filter setting.
   *
   * @param filterKey - The key identifying the filter to remove or modify.
   * @param optionToRemove - (Optional) The specific option to remove from a checkbox filter.
   *
   * This function updates the filter settings state to remove a specified option from a checkbox filter
   * or clears the min and max values for a range filter.
   */
  const handleRemove = (filterKey: string, optionToRemove?: string) => {
    const newFilters: any = { ...filterSettings };
    if (newFilters[filterKey].type === "checkbox" && optionToRemove) {
      // Filter out the option to remove
      newFilters[filterKey].options = newFilters[filterKey].options.filter(
        (option: string) => option !== optionToRemove,
      );
    } else {
      // Remove the entire filter for ranges
      newFilters[filterKey].min = null;
      newFilters[filterKey].max = null;
    }
    setFilterSettings(() => {
      return newFilters;
    });
  };

  /**
   * Checks if there are any active filters in the current filter settings.
   *
   * @returns A boolean indicating if there are active filters.
   *
   * This function iterates over the filter settings and checks if there are any
   * selected options for checkbox filters or if there are any non-null min or max values for range filters.
   */

  const hasActiveFilters = () => {
    return Object.values(filterSettings).some((filter: any) => {
      if (filter.type === "checkbox" && filter.options.length > 0) {
        return true;
      }
      if (
        filter.type === "range" &&
        (filter.min !== null || filter.max !== null)
      ) {
        return true;
      }
      return false;
    });
  };
  return (
    <div className="border-b mt-3 border-gray-900/10 pb-2 ">
      <div className="overflow-x-auto mr-5">
        {/* {Filter Boxes} */}
        <div className="my-1 ml-2s">
          {/* TODO: Refactor to flex box instead */}
          {VendorTypes[currentVendor]?.filters.map((vendorFilter) => {
            return (
              <div key={uuidv4()} className="inline-block ml-4 mr-2 my-1">
                <FilterManager
                  vendorFilter={vendorFilter}
                  filterSettings={filterSettings}
                  handleOptionToggle={handleOptionToggle}
                  setFilterSettings={setFilterSettings}
                  setFilterParams={setFilterParams}
                />
              </div>
            );
          })}
        </div>
        {/* {Active Filter Boxes} */}
        {hasActiveFilters() === true ? (
          <div className="mr-4 ml-2 inline-block">
            <div className="inline-block">
              {Object.entries(filterSettings).map(
                ([, filter]: [string, any]) => {
                  if (filter.type === "checkbox") {
                    return (
                      <div key={uuidv4()} className="inline-block">
                        {filter.options.map(
                          (option: string, indexTwo: number) => (
                            <Filterbox
                              key={uuidv4()}
                              className="mr-2"
                              handleClick={() =>
                                handleOptionToggle(filter.title, option)
                              }
                            >
                              {option}
                            </Filterbox>
                          ),
                        )}
                      </div>
                    );
                  }

                  if (
                    filter.type === "range" &&
                    (filter.min !== null || filter.max !== null)
                  ) {
                    const displayText = formatRangeDisplay(filter);
                    return (
                      <Filterbox
                        key={uuidv4()}
                        className="mr-2"
                        handleClick={() => handleRemove(filter.title)}
                      >
                        {displayText}
                      </Filterbox>
                    );
                  }
                  return null;
                },
              )}
              <Filterbox
                key={uuidv4()}
                handleClick={() => initializeFilterSettings(true)}
              >
                Clear All
              </Filterbox>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VendorFilter;
