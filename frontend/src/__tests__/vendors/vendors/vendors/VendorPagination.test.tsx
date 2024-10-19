import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import VendorPagination from "@/features/vendors/vendors/vendorComponents/VendorPagination";

describe("VendorPagination component", () => {
  it("should render the component correctly", () => {
    const mockSetCurrPage = jest.fn();
    render(
      <VendorPagination
        currPage={1}
        setCurrPage={mockSetCurrPage}
        totalPages={5}
        totalVendors={50}
      />,
    );

    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).not.toBeDisabled();

    fireEvent.click(screen.getByText("Next"));
    expect(mockSetCurrPage).toHaveBeenCalledWith(2);
  });

  it("should update the current page after clicking", () => {
    const mockSetCurrPage = jest.fn();
    render(
      <VendorPagination
        currPage={2}
        setCurrPage={mockSetCurrPage}
        totalPages={5}
        totalVendors={50}
      />,
    );

    fireEvent.click(screen.getByText("3"));
    expect(mockSetCurrPage).toHaveBeenCalledWith(3);
  });

  it("should update the current page when clicking the button", () => {
    const mockSetCurrPage = jest.fn();
    render(
      <VendorPagination
        currPage={3}
        setCurrPage={mockSetCurrPage}
        totalPages={5}
        totalVendors={50}
      />,
    );

    fireEvent.click(screen.getByText("Next"));
    expect(mockSetCurrPage).toHaveBeenCalledWith(4);
  });

  it("should update the current page when clicking on the previous button", () => {
    const mockSetCurrPage = jest.fn();
    render(
      <VendorPagination
        currPage={4}
        setCurrPage={mockSetCurrPage}
        totalPages={5}
        totalVendors={50}
      />,
    );

    fireEvent.click(screen.getByText("Previous"));
    expect(mockSetCurrPage).toHaveBeenCalledWith(3);
  });
});
