import React from "react";
import { render, screen } from "@testing-library/react";
import ButtonBanner from "@/components/button/button-banner";

describe("ButtonBanner", () => {
  const defaultProps = {
    text: "Learn More",
    textColor: "blue-500",
    href: "/learn-more",
    borderColor: "blue-500",
    borderWidth: 1,
    borderRadius: "lg",
    bgColor: "white",
    hoverBgColor: "blue-600",
    shadow: true,
  };

  it("renders the button with the correct text", () => {
    render(<ButtonBanner {...defaultProps} />);
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies the correct styles based on props", () => {
    render(<ButtonBanner {...defaultProps} />);
    const linkElement = screen.getByRole("link");

    expect(linkElement).toHaveClass(`text-${defaultProps.textColor}`);
    expect(linkElement).toHaveClass(`bg-${defaultProps.bgColor}`);
    expect(linkElement).toHaveClass(`border-${defaultProps.borderWidth}`);
    expect(linkElement).toHaveClass(`border-${defaultProps.borderColor}`);
    expect(linkElement).toHaveClass(`rounded-${defaultProps.borderRadius}`);
    expect(linkElement).toHaveClass(`hover:bg-${defaultProps.hoverBgColor}`);
    if (defaultProps.shadow) {
      expect(linkElement).toHaveClass("shadow");
    } else {
      expect(linkElement).not.toHaveClass("shadow");
    }
  });
});
