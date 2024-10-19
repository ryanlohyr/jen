/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { render, screen } from "@testing-library/react";

import FilterRange from "@/features/vendors/vendors/vendorComponents/VendorFilterComponents/FilterRange";

// this is to just make sure it renders because, dont need to test filter manager because if this can render then filter manager can render also (filter manager has 2 different components of FilterCheckBox which renders and FilterRange which also renders)

describe("FilterRange component", () => {
  it("should render without crashing when the page loads", () => {
    render(
      <FilterRange
        setFilterSettings={() => {}}
        currMin={null}
        currMax={null}
        title="Price"
      />,
    );
    expect(screen.getByText("Price")).toBeInTheDocument();
  });
});
