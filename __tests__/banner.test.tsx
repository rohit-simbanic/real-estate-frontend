import React from "react";
import { render, screen } from "@testing-library/react";
import Banner from "@/pages/home/features/components/banner";

describe("Banner", () => {
  it("renders dynamic header text correctly", () => {
    render(<Banner />);
    const dynamicHeaderText = screen.getByText(/Looking To Sell?/i);
    expect(dynamicHeaderText).toBeInTheDocument();
  });

  it("renders the details text correctly", () => {
    render(<Banner />);
    const detailsText = screen.getByText(/Looking To Sell?/i);
    expect(detailsText).toBeInTheDocument();
  });

  it("renders the ButtonBanner with correct properties", () => {
    render(<Banner />);
    const buttonText = screen.getByText("Start Now");
    expect(buttonText).toBeInTheDocument();
  });
});
