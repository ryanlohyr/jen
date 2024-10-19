/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { render } from "@testing-library/react";

import { Providers } from "@/lib/providers";

import type { BaseVendor } from "@/features/vendors/types/vendor.types";
import { VendorTitle } from "@/features/vendors/vendor-details/Components/VendorTitle";

const stubbedVendorData: BaseVendor = {
  id: 1,
  name: "Sample Vendor",
  address: "123 Sample Street, Sample City, SC 12345",
  companyLogo: "https://example.com/logo.png",
  facebook: "https://facebook.com/samplevendor",
  instagram: "https://instagram.com/samplevendor",
  email: "info@samplevendor.com",
  phone_number: "+1234567890",
  website: "https://samplevendor.com",
  google_id: "1234567890",
  google_maps_uri: "https://google.com/maps",
  photos: [
    {
      src: "https://example.com/photo1.jpg",
      width: 200,
      height: 300,
    },
    {
      src: "https://example.com/photo2.jpg",
      width: 200,
      height: 300,
    },
  ],
  min_price: 100,
  price_type: "per hour",
  max_capacity: 500,
  min_capacity: 50,
  max_price: 1000,
  rating: 4.5,
  rating_count: 150,
  description:
    "This is a sample vendor description. We provide excellent services.",
  card_descriptions: ["Affordable prices", "Great service", "High quality"],
  vendor_type: "Event Planning",
  extra_filters: "Outdoor, Catering",
  aboutUs: {
    title: "About Us",
    content:
      "We are a leading vendor in event planning with over 10 years of experience.",
  },
  packages: [],
  services: [],
};

describe("VendorTitle component", () => {
  it("should render the component correctly", () => {
    const name = "Vendor Name";
    const location = "Vendor Location";
    const { getByText } = render(
      <Providers>
        <VendorTitle
          name={name}
          location={location}
          vendorData={stubbedVendorData}
        />
        ,
      </Providers>,
    );

    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(location)).toBeInTheDocument();
  });
});
