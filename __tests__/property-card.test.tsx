//@ts-nocheck
import React from "react";
import { render, screen } from "@testing-library/react";
import PropertyCard from "@/components/cards/property-card";

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
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));
describe("PropertyCard", () => {
  const mockDetails = {
    imageUrl: "https://example.com/sample.jpg",
    price: "$300,000",
    address: "123 Fake St",
    bathrooms: 2,
    bedrooms: 3,
  };

  it("renders the property card with correct details", () => {
    render(<PropertyCard details={mockDetails} index={0} />);

    const image = screen.getByRole("img", { name: /property image/i });
    expect(image).toHaveAttribute("src", mockDetails.imageUrl);

    expect(screen.getByText(mockDetails.price)).toBeInTheDocument();

    expect(screen.getByText(mockDetails.address)).toBeInTheDocument();

    expect(screen.getByText(/2 rooms/i)).toBeInTheDocument();
    expect(screen.getByText(/3 rooms/i)).toBeInTheDocument();

    expect(screen.getByText("For Sale")).toBeInTheDocument();
  });

  it("renders the lease tag for odd indices", () => {
    render(<PropertyCard details={mockDetails} index={1} />);
    expect(screen.getByText("For Lease")).toBeInTheDocument();
  });
});
