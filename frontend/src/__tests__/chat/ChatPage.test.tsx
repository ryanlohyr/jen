import React from "react";

import { render, screen } from "@testing-library/react";

import { ChatPage } from "@/features/chat/components/ChatPage";

// Mock the General component
jest.mock("@/features/chat/components/General", () => ({
  __esModule: true,
  default: ({ generalArray, setGeneralArray }) => (
    <div data-testid="general">
      <span data-testid="general-array-length">{generalArray.length}</span>
    </div>
  ),
}));

describe("ChatPage Component", () => {
  it("renders the ChatPage and General component correctly", () => {
    render(<ChatPage />);

    // Check if General component is rendered within ChatPage
    const generalElement = screen.getByTestId("general");
    expect(generalElement).toBeInTheDocument();

    // Check the initial length of generalArray
    const generalArrayLengthElement = screen.getByTestId(
      "general-array-length",
    );
    expect(generalArrayLengthElement.textContent).toBe("0");
  });
});
