/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { render } from "@testing-library/react";

import { VendorPackages } from "@/features/vendors/vendor-details/Components/VendorPackages";

const packages = [
  { package_name: "Package 1", package_link: "package1.pdf" },
  { package_name: "Package 2", package_link: "package2.pdf" },
  { package_name: "Package 3", package_link: "package3.pdf" },
  { package_name: "Package 3", package_link: "package4.pdf" },
];

describe("VendorPackages component", () => {
  it("should render the component correctly", () => {
    const { getByText, getAllByRole } = render(
      <VendorPackages packages={packages} />,
    );

    expect(getByText("Packages")).toBeInTheDocument();
    expect(getAllByRole("link")).toHaveLength(4); // One link for each package
    // even if packages have the same name, it should still render as long as the package_link is different
    expect(getByText("Package 3 (1)")).toBeInTheDocument();
  });
});

describe("VendorPackageCard component", () => {
  it("should render correctly with package name and link", () => {
    const { getByText, getByRole } = render(
      <VendorPackages packages={[packages[0]]} />,
    );

    expect(getByText("Package 1")).toBeInTheDocument();
    expect(getByRole("link")).toHaveAttribute("href", "package1.pdf");
  });
});
