/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { render } from "@testing-library/react";

import FilterCheckbox from "@/features/vendors/vendors/vendorComponents/VendorFilterComponents/FilterCheckbox";

describe("FilterCheckbox component", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const selectedOptions = ["Option 1"];

  it("should render the component correctly", () => {
    const onOptionToggle = jest.fn();
    const { getByText } = render(
      <FilterCheckbox
        title="Title"
        options={options}
        selectedOptions={selectedOptions}
        onOptionToggle={onOptionToggle}
      />,
    );

    expect(getByText("Title")).toBeInTheDocument();
  });
});
