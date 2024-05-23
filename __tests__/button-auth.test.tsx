import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonAuth from "@/components/button/button-auth";

describe("ButtonAuth", () => {
  const defaultProps = {
    text: "Click me",
    textColor: "blue-500",
    href: "/",
    borderColor: "blue-500",
    borderWidth: 2,
    borderRadius: "md",
    bgColor: "white",
    hoverBgColor: "blue-600",
    shadow: true,
  };

  it("renders the button with the correct text", () => {
    render(<ButtonAuth {...defaultProps} />);
    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies correct styling based on props", () => {
    render(<ButtonAuth {...defaultProps} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass(
      "text-blue-500 bg-white border-2 border-blue-500 rounded-md shadow"
    );
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("has the correct hover background color", () => {
    render(<ButtonAuth {...defaultProps} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement.className).toMatch(/hover:bg-blue-600/);
  });
});
