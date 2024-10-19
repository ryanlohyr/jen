/* eslint-disable testing-library/no-node-access */
// PartiallyFilledDiamond.test.tsx
import React from "react";

import { render } from "@testing-library/react";

import PartiallyFilledDiamond from "@/features/vendors/vendors/vendorComponents/PartiallyFilledDiamond";

describe("PartiallyFilledDiamond", () => {
  it("should renders correctly when there is -% fill", () => {
    const { container } = render(
      <PartiallyFilledDiamond fillPercentage={-1} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should renders correctly when there is 0% fill", () => {
    const { container } = render(<PartiallyFilledDiamond fillPercentage={0} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render correctly when there is 25% fill", () => {
    const { container } = render(
      <PartiallyFilledDiamond fillPercentage={25} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render correctly when there is 50% fill", () => {
    const { container } = render(
      <PartiallyFilledDiamond fillPercentage={50} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render correctly when there is 75% fill", () => {
    const { container } = render(
      <PartiallyFilledDiamond fillPercentage={75} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render correctly when there is 100% fill", () => {
    const { container } = render(
      <PartiallyFilledDiamond fillPercentage={100} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
