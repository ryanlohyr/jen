import queryString from "query-string";

import {
  formatQuery,
  parseRangeValue,
  sanitizeParams,
} from "@/features/vendors/vendors/vendorComponents/VendorFilterComponents/FilterHelper";

jest.mock("query-string");

jest.mock("@/features/vendors/types/vendorFilter.types", () => ({
  VendorTypes: {
    TestVendor: {
      filters: [
        { type: "range", name: "price" },
        { type: "checkbox", name: "categories", options: ["Food", "Drinks"] },
      ],
    },
  },
}));

describe("formatQuery", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should correctly format query for range type settings", () => {
    const settings = {
      price: { type: "range", min: 100, max: 500, value: "price" },
    };
    formatQuery(settings);
    expect(queryString.stringify).toHaveBeenCalledWith({
      min_price: "100",
      max_price: "500",
    });
  });

  it("should correctly format query for options type settings", () => {
    const settings = {
      categories: { type: "checkbox", options: ["Food", "Drinks"] },
    };
    formatQuery(settings);

    console.log(settings);
    console.log(queryString.stringify);
    expect(queryString.stringify).toHaveBeenCalledWith({
      undefined: ["Food", "Drinks"],
    });
  });

  it("should skip null values in range type settings", () => {
    const settings = {
      price: { type: "range", min: null, max: 500, value: "price" },
    };
    formatQuery(settings);
    expect(queryString.stringify).toHaveBeenCalledWith({
      max_price: "500",
    });
  });
});

describe("parseRangeValue", () => {
  it("should return null if resetFilters is true", () => {
    const result = parseRangeValue({ key: ["100"] }, "key", true);
    expect(result).toBeNull();
  });

  it("should return the parsed integer value if resetFilters is false", () => {
    const result = parseRangeValue({ key: ["100"] }, "key", false);
    expect(result).toBe(100);
  });

  it("should return null if the key is not present in parsedParams", () => {
    const result = parseRangeValue({}, "key", false);
    expect(result).toBeNull();
  });
});

describe("sanitizeParams", () => {
  it("should sanitize and format parameters correctly", () => {
    const unsanitizedParams = new URLSearchParams(
      "min_price=100&max_price=500&categories=Food",
    );
    const result = sanitizeParams(unsanitizedParams, "TestVendor");
    expect(result).toBe("categories=Food&min_price=100&max_price=500");
  });

  it("should handle min_price greater than max_price correctly", () => {
    const unsanitizedParams = new URLSearchParams(
      "min_price=500&max_price=100",
    );
    console.warn = jest.fn();
    const result = sanitizeParams(unsanitizedParams, "TestVendor");
    expect(result).toBe("");
    expect(console.warn).toHaveBeenCalledWith(
      "min_price is greater than max_price. Skipping these values.",
    );
  });

  it("should skip invalid checkbox options", () => {
    const unsanitizedParams = new URLSearchParams(
      "min_price=100&max_price=500&categories=Invalid",
    );
    const result = sanitizeParams(unsanitizedParams, "TestVendor");
    expect(result).toBe("min_price=100&max_price=500");
  });
});
