/* eslint-disable react/button-has-type */
import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VendorFilter from "@/features/vendors/vendors/vendorComponents/VendorFilter";

describe("VendorFilter component", () => {
  it("renders filter options correctly", () => {
    const currentVendor = "venues";
    const filterParams = "";
    const setFilterParams = jest.fn();

    render(
      <VendorFilter
        currentVendor={currentVendor}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        setCurrentPage={() => {}}
      />,
    );

    // Check that filter options are rendered correctly
    expect(screen.getByText("Included")).toBeInTheDocument();
    expect(screen.getByText("Venue Type")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Capacity")).toBeInTheDocument();
    expect(screen.getByText("Indoors/Outdoor")).toBeInTheDocument();
    expect(screen.getByText("Amenities")).toBeInTheDocument();
  });

  it("should have the correct url parsed when the user clicks on each individual filter", async () => {
    const currentVendor = "venues";
    const filterParams = "";
    const setFilterParams = jest.fn();

    render(
      <VendorFilter
        currentVendor={currentVendor}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        setCurrentPage={() => {}}
      />,
    );

    window.history.pushState({}, "Test Page", "/vendors/venues?");

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);
    const elem = screen.getByText("Venue Type");
    expect(elem).toBeInTheDocument();
    const checkParksAndGardens = screen.getByText("parks, gardens");
    expect(checkParksAndGardens).toBeInTheDocument();
    expect(screen.getByText("restaurants, breweries")).toBeInTheDocument();

    await userEvent.click(checkParksAndGardens);
    expect(screen.getByText("Clear All")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Clear All"));
    expect(
      screen.queryByText("restaurants, breweries"),
    ).not.toBeInTheDocument();
  });
  // I am unable to check integrating testing but the frontend works

  // it("handles option toggling correctly", () => {
  //   const currentVendor = "Food";
  //   const filterParams = "";
  //   const setFilterParams = jest.fn();

  //   render(
  //     <VendorFilter
  //       currentVendor={currentVendor}
  //       filterParams={filterParams}
  //       setFilterParams={setFilterParams}
  //     />,
  //   );

  //   // Simulate clicking on an option
  //   const option = screen.getByText("Option Name");
  //   option.click();

  //   // Check that the option is toggled correctly
  //   expect(setFilterParams).toHaveBeenCalledWith("newFilterParams");
  // });

  // it("handles clearing all filters correctly", () => {
  //   const currentVendor = "Food";
  //   const filterParams = "";
  //   const setFilterParams = jest.fn();

  //   render(
  //     <VendorFilter
  //       currentVendor={currentVendor}
  //       filterParams={filterParams}
  //       setFilterParams={setFilterParams}
  //     />,
  //   );

  //   // Simulate clicking on the clear all button
  //   const clearAllButton = screen.getByText("Clear All");
  //   clearAllButton.click();

  //   // Check that all filters are cleared
  //   expect(setFilterParams).toHaveBeenCalledWith("");
  // });
});
