/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { render } from "@testing-library/react";

import { toUserFriendlyName } from "@/utils/stringValidators";

import { VendorServices } from "@/features/vendors/vendor-details/Components/VendorServices";

jest.mock("@/utils/stringValidators", () => ({
  toUserFriendlyName: jest.fn((name) => name.toUpperCase()),
}));

const services = [
  { service_name: "Service 1", values: ["Value 1", "Value 2", "Value 3"] },
  { service_name: "Service 2", values: ["Value 4", "Value 5"] },
];

describe("VendorServices component", () => {
  it("should render the component correctly", () => {
    const { getByText, getAllByRole } = render(
      <VendorServices services={services} />,
    );

    expect(getByText("Services")).toBeInTheDocument(); // Mocked toUserFriendlyName capitalizes the name
    expect(getAllByRole("list")).toHaveLength(2); // One list for each service
  });
});

describe("VendorServiceEntry component", () => {
  it("shoudl render the correct service name and values", () => {
    const { getByText, getAllByRole } = render(
      <VendorServices services={[services[0]]} />,
    );
    expect(toUserFriendlyName).toHaveBeenCalledWith("Service 1"); // successfully called the function
    expect(getByText("SERVICE 1")).toBeInTheDocument(); // Mocked toUserFriendlyName capitalizes the name
    expect(getAllByRole("listitem")).toHaveLength(3); // One list item for each value
  });
});
