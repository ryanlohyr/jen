import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import ChatOptions from "@/features/chat/components/chatComponents/ChatOption";

// Mock uuidv4 to return consistent values for testing
jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("unique-id"),
}));

describe("ChatOptions Component", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const sendButtonPressed = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the options correctly", () => {
    render(
      <ChatOptions options={options} sendButtonPressed={sendButtonPressed} />,
    );

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls sendButtonPressed with the correct argument when a button is clicked", () => {
    render(
      <ChatOptions options={options} sendButtonPressed={sendButtonPressed} />,
    );

    options.forEach((option) => {
      const button = screen.getByText(option);
      fireEvent.click(button);
      expect(sendButtonPressed).toHaveBeenCalledWith(option);
    });

    expect(sendButtonPressed).toHaveBeenCalledTimes(options.length);
  });
});
