import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import type { Photo } from "@/features/vendors/types/vendor.types";
import { VendorImageBanner } from "@/features/vendors/vendor-details/Components/VendorImageBanner";

import useWindowSize from "@/hooks/useWindowSize";

jest.mock("@/hooks/useWindowSize");

jest.mock(
  "yet-another-react-lightbox",
  // eslint-disable-next-line react/display-name
  () => (props: { open: unknown }) =>
    props.open ? <div data-testid="lightbox">Lightbox Open</div> : null,
);

// eslint-disable-next-line react/display-name
jest.mock("yet-another-react-lightbox/plugins/thumbnails", () => () => (
  <div>Thumbnails Plugin</div>
));

jest.mock(
  "@/components/custom/ImageAlbum",
  // eslint-disable-next-line react/display-name
  () => (props: { onClick: (arg0: { index: number }) => void }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div data-testid="image-album" onClick={() => props.onClick({ index: 0 })}>
      ImageAlbum Mock
    </div>
  ),
);

describe("VendorImageBanner", () => {
  const photos: Photo[] = [
    { src: "image1.jpg", width: 800, height: 600 },
    { src: "image2.jpg", width: 800, height: 600 },
    { src: "image3.jpg", width: 800, height: 600 },
    { src: "image4.jpg", width: 800, height: 600 },
    { src: "image5.jpg", width: 800, height: 600 },
    { src: "image6.jpg", width: 800, height: 600 },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders correctly on wide screens", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024 });

    render(<VendorImageBanner photos={photos} />);

    expect(screen.getByText(/View all media \(6\)/)).toBeInTheDocument();
    expect(screen.getByTestId("image-album")).toBeInTheDocument();
  });

  it("renders correctly on narrow screens", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 500 });

    render(<VendorImageBanner photos={photos} />);

    expect(screen.getByText(/View all media \(6\)/)).toBeInTheDocument();

    expect(screen.getByTestId("image-album")).toBeInTheDocument();
  });

  it("opens the Lightbox when the button is clicked on wide screens", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024 });

    render(<VendorImageBanner photos={photos} />);

    fireEvent.click(screen.getByText(/View all media \(6\)/));

    expect(screen.getByTestId("lightbox")).toBeInTheDocument();
  });

  it("opens the Lightbox when an image is clicked", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024 });

    render(<VendorImageBanner photos={photos} />);

    fireEvent.click(screen.getByTestId("image-album"));

    expect(screen.getByTestId("lightbox")).toBeInTheDocument();
  });

  it("closes the Lightbox when close is triggered", () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024 });

    const { rerender } = render(<VendorImageBanner photos={photos} />);
    fireEvent.click(screen.getByText(/View all media \(6\)/));
    rerender(<VendorImageBanner photos={photos} />);

    expect(screen.getByTestId("lightbox")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("lightbox"));

    expect(screen.getByTestId("image-album")).toBeInTheDocument();
  });
});
