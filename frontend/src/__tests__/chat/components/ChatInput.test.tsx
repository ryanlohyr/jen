import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import type { ChatInputProps } from "@/features/chat/components/chatComponents/ChatInput";
import { ChatInput } from "@/features/chat/components/chatComponents/ChatInput";

jest.mock("@radix-ui/react-icons", () => ({
  PaperPlaneIcon: () => <svg data-testid="paper-plane-icon" />,
}));

describe("ChatInput Component", () => {
  const sendButtonPressed = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props: Partial<ChatInputProps> = {}) => {
    return render(
      <ChatInput sendButtonPressed={sendButtonPressed} {...props} />,
    );
  };

  it("renders the ChatInput component correctly", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Send message")).toBeInTheDocument();
    expect(screen.getByTestId("paper-plane-icon")).toBeInTheDocument();
  });

  it("handles text input changes and adjusts height", () => {
    renderComponent();
    const textarea = screen.getByPlaceholderText("Send message");

    fireEvent.change(textarea, { target: { value: "Hello" } });
    expect(textarea).toHaveValue("Hello");
    // Adjust height based on content
    expect(textarea.style.height).not.toBe("40px");
  });

  it("submits the form on Enter key press", () => {
    renderComponent();
    const textarea = screen.getByPlaceholderText("Send message");

    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter", charCode: 13 });

    expect(sendButtonPressed).toHaveBeenCalledWith("Hello");
    expect(textarea).toHaveValue("");
    expect(textarea.style.height).toBe("40px");
  });

  it("does not submit the form on Shift+Enter key press", () => {
    renderComponent();
    const textarea = screen.getByPlaceholderText("Send message");

    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.keyDown(textarea, {
      key: "Enter",
      code: "Enter",
      shiftKey: true,
    });

    expect(sendButtonPressed).not.toHaveBeenCalled();
    expect(textarea).toHaveValue("Hello");
  });
});
