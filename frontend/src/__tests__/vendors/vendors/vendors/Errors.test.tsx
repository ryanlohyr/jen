import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import Errors from "@/components/Errors";

describe("Errors component", () => {
  it("should renders error message and code when error code is 404 when invalid url is found", () => {
    render(<Errors errorType="pageNotFound" />);

    expect(screen.getByText(/Oops!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We can’t seem to find the page you’re looking for./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
  });

  it("should render error message and code when error code is 404 and vendor is not found", () => {
    render(<Errors errorType="vendorNotFound" />);
    expect(screen.getByText(/Oops!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We can’t seem to find the vendor you’re looking for./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Error 404: VendorPageNotFound/i),
    ).toBeInTheDocument();
  });

  it("should simulate clicking when the button is clicked", () => {
    render(<Errors errorType="pageNotFound" />);

    const backButton = screen.getByRole("button", { name: /Back/i });
    const reportButton = screen.getByRole("button", { name: /Report/i });

    fireEvent.click(backButton);
    fireEvent.click(reportButton);

    expect(backButton).toBeInTheDocument();
    expect(reportButton).toBeInTheDocument();
  });
});
