/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { fireEvent, render } from "@testing-library/react";

import Filterbox from "@/features/vendors/vendors/vendorComponents/VendorFilterComponents/Filterbox";

describe("Filterbox component", () => {
  it("should render the component accurately", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Filterbox handleClick={handleClick}>Children Text</Filterbox>,
    );

    expect(getByText("Children Text")).toBeInTheDocument();
  });

  it("should call the button one time", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Filterbox handleClick={handleClick}>Children Text</Filterbox>,
    );

    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
