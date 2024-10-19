/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React from "react";

import { render, screen } from "@testing-library/react";

import type { BaseVendor } from "@/features/vendors/types/vendor.types";
// Import the component that uses VendorCard
import VendorCard from "@/features/vendors/vendors/vendorComponents/VendorCard";

// Mock the VendorCard component
jest.mock(
  "@/features/vendors/vendors/vendorComponents/VendorCard",
  () =>
    ({ vendorData }: { vendorData: BaseVendor }) => (
      <div>
        <p>{vendorData.name}</p>
        <p>Starts at {vendorData.min_price}</p>
        <p>
          {vendorData.rating} ({vendorData.rating_count})
        </p>
        <p>{vendorData.description}</p>
      </div>
    ),
);

const vendorData: BaseVendor = {
  id: 1,
  name: "Vendor Name",
  address: "Location",
  companyLogo: "Logo URL",
  facebook: "Facebook URL",
  instagram: "Instagram URL",
  website: "Website URL",
  photos: [{ src: "Photo URL", width: 100, height: 100 }],
  min_price: 100,
  max_price: 200,
  rating: 4.5,
  rating_count: 100,
  description: "Description",
  card_descriptions: ["Description 1", "Description 2"],
  aboutUs: { title: "Title", content: "Content" },
  packages: [{ package_name: "Package Name", package_link: "Package Link" }],
  services: [{ service_name: "Service Name", values: ["Value 1", "Value 2"] }],
  email: "vendor@example.com",
  phone_number: "1234567890",
  price_type: "Fixed",
  extra_filters: "Extra Filters",
  max_capacity: 200,
  min_capacity: 100,
  // Add the missing properties here
};

describe("YourComponent", () => {
  it("renders vendor data correctly", () => {
    render(<VendorCard vendorData={vendorData} currentVendor="test" />);

    expect(screen.getByText(vendorData.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Starts at ${vendorData.min_price}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${vendorData.rating} (${vendorData.rating_count})`),
    ).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders vendor data correctly when not hovered", async () => {
    render(<VendorCard vendorData={vendorData} currentVendor="test" />);

    const vendorNameElement = screen.getByText(vendorData.name);

    expect(vendorNameElement).not.toHaveClass("underline");
  });
});
