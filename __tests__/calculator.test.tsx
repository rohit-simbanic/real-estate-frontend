import React from "react";
import { render, screen } from "@testing-library/react";
import CalculatorCard from "@/pages/home/features/components/calculator";
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src} alt={alt} width={width} height={height} />,
}));

describe("CalculatorCard", () => {
  const props = {
    title: "Example Calculator",
    imageUrl: "https://example.com/image.png",
  };

  it("renders the card with the correct title and image", () => {
    render(<CalculatorCard {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();

    const image = screen.getByAltText("calculator");
    expect(image).toHaveAttribute("src", props.imageUrl);
    expect(image).toHaveAttribute("alt", "calculator");
  });

  it("should have the correct styling properties", () => {
    render(<CalculatorCard {...props} />);

    const card = screen.getByText(props.title).closest("div");
    expect(card).toHaveClass("flex justify-center items-center");
  });
});
