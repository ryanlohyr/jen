/* eslint-disable react/button-has-type */
import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import VendorPopover from "@/features/vendors/vendors/vendorComponents/VendorPopover";

describe("VendorPopover Component", () => {
  it("renders with default value", () => {
    render(<VendorPopover currentVendor="test" />);

    const button = screen.getByTestId("special-button");

    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    const noVendors = screen.getByText("Search Vendor...");

    expect(noVendors).toBeInTheDocument();
  });
});
