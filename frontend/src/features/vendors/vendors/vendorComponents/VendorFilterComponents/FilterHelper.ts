/* eslint-disable @typescript-eslint/no-explicit-any */

import queryString from "query-string";

import { VendorTypes } from "@/features/vendors/types/vendorFilter.types";

/**
 * Formats a settings object into a query string for filtering purposes.
 *
 * @param settings - An object containing filter settings, where each key represents a filter and each value is an object that defines the filter type and its parameters.
 * @returns A query string representing the filters, formatted with keys as filter titles and values as comma-separated strings.
 *
 * The settings object should have the following structure:
 * {
 *   filter1: {
 *     type: 'range',
 *     value: 'price',
 *     min: 10,
 *     max: 100
 *   },
 *   filter2: {
 *     type: 'select',
 *     value: 'color',
 *     options: ['red', 'blue']
 *   },
 *   ...
 * }
 *
 * The output query string will be:
 * "min_price=10&max_price=100&color=red,blue"
 */

export const formatQuery = (settings: any) => {
  // Flatten the settings to a single object with keys as the filter titles and values as comma-separated strings
  const queryObject: any = {};

  for (const [, value] of Object.entries(settings) as [string, any][]) {
    if (value.type === "range") {
      const maxProperty = `max_${value.value}`;
      const minProperty = `min_${value.value}`;
      if (value.max !== null) {
        queryObject[maxProperty] = `${value.max}`;
      }
      if (value.min !== null) {
        queryObject[minProperty] = `${value.min}`;
      }
    } else if (value.type === "checkbox" && value.options?.length > 0) {
      queryObject[value.value] = value.options;
    }
  }
  return queryString.stringify(queryObject);
};

/**
 * Sanitizes URL search parameters based on allowed filters for a specific vendor type.
 *
 * @param unsanitizedParams - The URLSearchParams object containing the original search parameters.
 * @param sanitizedVendor - The key representing the vendor type in the VendorTypes object.
 * @returns A sanitized query string with only allowed filters and valid range values.
 *
 * The unsanitizedParams object should be a URLSearchParams instance with key-value pairs.
 * The sanitizedVendor should be a key that exists in the VendorTypes object, which contains allowed filters for that vendor.
 *
 * The function checks for valid filters, constructs a query string with valid parameters,
 * and ensures that the min_price is less than or equal to the max_price before including them in the final query string.
 */

export const sanitizeParams = (
  unsanitizedParams: URLSearchParams,
  sanitizedVendor: keyof typeof VendorTypes,
) => {
  let sanitizedFilterParams = "";
  let minPrice = null;
  let maxPrice = null;

  unsanitizedParams.forEach((value, key) => {
    VendorTypes[sanitizedVendor].filters.forEach((filter) => {
      if (filter.type === "range") {
        if (key === "min_price") {
          minPrice = parseFloat(value);
        } else if (key === "max_price") {
          maxPrice = parseFloat(value);
        }
      } else if (filter.type === "checkbox") {
        if (filter.options.includes(value)) {
          sanitizedFilterParams += `${key}=${value}&`;
        }
      }
    });
  });

  // Check if min_price is less than or equal to max_price before adding them
  if (minPrice !== null && maxPrice !== null) {
    if (minPrice <= maxPrice) {
      sanitizedFilterParams += `min_price=${minPrice}&max_price=${maxPrice}&`;
    } else {
      console.warn(
        "min_price is greater than max_price. Skipping these values.",
      );
    }
  } else {
    if (minPrice !== null) {
      sanitizedFilterParams += `min_price=${minPrice}&`;
    }
    if (maxPrice !== null) {
      sanitizedFilterParams += `max_price=${maxPrice}&`;
    }
  }

  return sanitizedFilterParams.slice(0, -1); // Remove the last & character
};

/**
 * Parses a range value from the given parsed parameters.
 *
 * @param parsedParams - An object where keys are parameter names and values are arrays of strings representing parameter values.
 * @param key - The key representing the specific parameter to parse.
 * @param resetFilters - A boolean flag indicating whether to reset the filters.
 * @returns The parsed range value as a number, or null if resetFilters is true or the key is not found.
 *
 * The parsedParams object should have keys corresponding to parameter names and values as arrays of strings.
 * The key should be a string representing the specific parameter to parse.
 * The resetFilters should be a boolean indicating whether to reset the filters or not.
 *
 * The function returns a parsed integer value from the specified key in the parsedParams object,
 * or null if the key is not found or resetFilters is true.
 */
export const parseRangeValue = (
  parsedParams: { [key: string]: string[] },
  key: string,
  resetFilters: boolean,
): number | null => {
  if (resetFilters) {
    return null;
  }
  const value = parsedParams[key] ? parseInt(parsedParams[key][0], 10) : null;
  return value;
};

export const formatRangeDisplay = (filter: any) => {
  const isPriceFilter =
    filter.title === "Price" || filter.title === "Price Type";
  const isCapacityFilter = filter.title === "Capacity";

  let minValue = filter.min;
  let maxValue = filter.max;

  if (isPriceFilter) {
    minValue = minValue !== null ? `$${minValue}` : null;
    maxValue = maxValue !== null ? `$${maxValue}` : null;
  }

  if (isCapacityFilter) {
    minValue = minValue !== null ? `${minValue} people` : null;
    maxValue = maxValue !== null ? `${maxValue} people` : null;
  }

  if (filter.min === null && filter.max !== null) {
    return `Not more than ${maxValue}`;
  }
  if (filter.max === null && filter.min !== null) {
    return `No less than ${minValue}`;
  }
  return `${minValue} to ${maxValue}`;
};
