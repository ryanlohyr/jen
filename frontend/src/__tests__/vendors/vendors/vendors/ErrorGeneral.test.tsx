// __tests__/Error404.test.tsx

import { render, screen } from "@testing-library/react";

import ErrorGeneral from "@/components/ErrorGeneral";

describe("ErrorGeneral Component", () => {
  it("should render correctly when the page loads", () => {
    render(<ErrorGeneral />);

    // Check if the "Oops!" text is rendered
    const oopsText = screen.getByText(/Oops!/i);
    expect(oopsText).toBeInTheDocument();

    // Check if the error message is rendered
    const errorMessage = screen.getByText(
      /We are sorry, but it looks like something went wrong. Please click the button below to return to the homepage./i,
    );
    expect(errorMessage).toBeInTheDocument();

    // Check if the button is rendered
    const button = screen.getByRole("button", { name: /Back to Home/i });
    expect(button).toBeInTheDocument();

    const helpMessage = screen.getByText(
      /If the issue persists, feel free to contact help@jouvire.com! Thanks!/i,
    );
    expect(helpMessage).toBeInTheDocument();

    // Check if the images are rendered
    const images = screen.getAllByAltText(/error picture/i);
    expect(images).toHaveLength(1);
  });
});
