/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { render } from "@testing-library/react";

import { VendorAboutUs } from "@/features/vendors/vendor-details/Components/VendorAboutUs";

const props = {
  aboutUsTitle: "About Us Title",
  aboutUsContent: "About Us Content",
  companyLogo: "company-logo.jpg",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  website: "https://example.com",
};

describe("VendorAboutUs component", () => {
  it("should render the component correctly", () => {
    const { getByText, getByAltText, getByTestId } = render(
      <VendorAboutUs {...props} />,
    );

    expect(getByText("About Us")).toBeInTheDocument();
    expect(getByAltText("Company Logo")).toBeInTheDocument();
    expect(getByTestId("facebook-icon")).toBeInTheDocument();
    expect(getByTestId("instagram-icon")).toBeInTheDocument();
    expect(getByTestId("globe-icon")).toBeInTheDocument();

    const facebookLink = getByTestId("facebook-link");
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute("href", "https://facebook.com");

    const instagramLink = getByTestId("instagram-link");
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute("href", "https://instagram.com");

    const websiteLink = getByTestId("company-link");
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute("href", "https://example.com");
  });

  it("should not render social icons when no URLs are provided", () => {
    const { queryByTestId } = render(
      <VendorAboutUs
        aboutUsContent="About Us Content"
        companyLogo="company-logo.jpg"
      />,
    );

    expect(queryByTestId("facebook-icon")).toBeNull();
    expect(queryByTestId("instagram-icon")).toBeNull();
    expect(queryByTestId("globe-icon")).toBeNull();
  });
});
