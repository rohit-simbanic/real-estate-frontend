import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "@/theme/components/pagination/pagination";

describe("Pagination", () => {
  const mockPaginate = jest.fn();

  beforeEach(() => {
    mockPaginate.mockClear();
  });

  it("renders the correct number of pages", () => {
    const totalPages = 5;
    render(
      <Pagination
        currentPage={1}
        totalPages={totalPages}
        paginate={mockPaginate}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(totalPages);
  });

  it("correctly highlights the current page", () => {
    const currentPage = 3;
    const totalPages = 5;
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={mockPaginate}
      />
    );

    const currentPageButton = screen.getByText(currentPage.toString());
    expect(currentPageButton).toHaveClass("bg-blue-500 text-white");
  });

  it("calls paginate function with the right page number when a page button is clicked", () => {
    const totalPages = 5;
    render(
      <Pagination
        currentPage={1}
        totalPages={totalPages}
        paginate={mockPaginate}
      />
    );

    const pageToClick = 3;
    const pageButton = screen.getByText(pageToClick.toString());
    fireEvent.click(pageButton);

    expect(mockPaginate).toHaveBeenCalledWith(pageToClick);
  });

  it("does not highlight non-current pages", () => {
    const currentPage = 1;
    const totalPages = 5;
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={mockPaginate}
      />
    );

    for (let i = 2; i <= totalPages; i++) {
      const nonCurrentPageButton = screen.getByText(i.toString());
      expect(nonCurrentPageButton).toHaveClass(
        "bg-white text-blue-500 hover:bg-blue-100"
      );
    }
  });
});
