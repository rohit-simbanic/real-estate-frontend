import React from "react";
import { render, screen } from "@testing-library/react";
import SectionTitle from "@/theme/components/section-title/section-title";

describe("SectionTitle", () => {
  it("renders the title and description correctly", () => {
    const title = "Test Title";
    const description = "Test Description";

    render(<SectionTitle title={title} description={description} />);

    const titleElement = screen.getByRole("heading", { name: title });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(description);

    expect(titleElement).toHaveClass(
      "text-3xl font-bold sm:text-4xl text-center text-gray-900 dark:text-white"
    );
    expect(descriptionElement).toHaveClass(
      "mt-4 pb-6 text-gray-600 text-center dark:text-teal-600 uppercase"
    );
  });

  it("renders alternative text correctly", () => {
    const title = "Another Title";
    const description = "Another Description";

    render(<SectionTitle title={title} description={description} />);

    expect(screen.getByRole("heading", { name: title })).toHaveTextContent(
      title
    );
    expect(screen.getByText(description)).toHaveTextContent(description);
  });
});
