import React from "react";

import { render, screen } from "@testing-library/react";

import { ChatBubble } from "@/features/chat/components/chatComponents/ChatBubble";

// Mocking next/image
jest.mock("next/image", () => {
  const Image = (props: { alt: string }) => <img alt={props.alt} />;
  Image.displayName = "Image";
  return Image;
});

// Mocking react-markdown
jest.mock("react-markdown", () => {
  const ReactMarkdown = (props: { children: React.ReactNode }) => (
    <div>{props.children}</div>
  );
  ReactMarkdown.displayName = "ReactMarkdown";
  return ReactMarkdown;
});
jest.mock("remark-gfm", () => () => {});

// Mocking carousel components
jest.mock("@/components/ui/carousel", () => ({
  Carousel: jest.fn(({ children }) => <div>{children}</div>),
  CarouselContent: jest.fn(({ children }) => <div>{children}</div>),
  CarouselItem: jest.fn(({ children }) => <div>{children}</div>),
  CarouselNext: jest.fn(() => <div>Next</div>),
  CarouselPrevious: jest.fn(() => <div>Previous</div>),
}));

describe("ChatBubble Component", () => {
  const content = "This is a chat bubble content";

  const carousell = [
    { title: "Item 1", image: "/image1.jpg", description: "Description 1" },
    { title: "Item 2", image: "/image2.jpg", description: "Description 2" },
  ];

  it("renders chat bubble with content", () => {
    render(<ChatBubble isMe content={content} carousell={carousell} />);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it("renders carousel when carousell items are provided", () => {
    render(<ChatBubble isMe content={content} carousell={carousell} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
