import React from "react";
import { render, screen } from "@testing-library/react";
import ContactButton from "@/components/button/button-contact";

describe("ContactButton", () => {
  const defaultProps = {
    text: "Contact Us",
    href: "/contact",
    textColor: "white",
    bgColor: "blue-500",
    hoverBgColor: "blue-700",
    hoverTextColor: "yellow-500",
  };

  it("renders the button with the correct text and icon", () => {
    render(<ContactButton {...defaultProps} />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("applies the correct styles based on props", () => {
    render(<ContactButton {...defaultProps} />);
    const linkElement = screen.getByRole("link");

    expect(linkElement).toHaveClass(`text-${defaultProps.textColor}`);
    expect(linkElement).toHaveClass(`bg-${defaultProps.bgColor}`);
    expect(linkElement).toHaveClass(`hover:bg-${defaultProps.hoverBgColor}`);
    expect(linkElement).toHaveClass(
      `hover:text-${defaultProps.hoverTextColor}`
    );
  });
});
