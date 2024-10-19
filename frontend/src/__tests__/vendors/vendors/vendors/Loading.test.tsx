import React from "react";

import { render, screen } from "@testing-library/react";

import Loading from "@/components/Loading";

describe("Loading Component", () => {
  it("should render properly when the page loads", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
