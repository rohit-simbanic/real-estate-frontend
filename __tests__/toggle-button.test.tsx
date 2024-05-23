import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToggleButton from "@/theme/components/toggle-button/button-toggle";

describe("ToggleButton", () => {
  it("renders with the checkbox in the correct state", () => {
    const { rerender } = render(
      <ToggleButton isChecked={false} handleChange={() => {}} />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    rerender(<ToggleButton isChecked={true} handleChange={() => {}} />);
    expect(checkbox).toBeChecked();
  });

  it("calls handleChange when the toggle is clicked", () => {
    const handleChange = jest.fn();
    render(<ToggleButton isChecked={false} handleChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("toggles the visual state when clicked", () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <ToggleButton isChecked={false} handleChange={handleChange} />
    );

    const span = screen.getByTestId("toggle-indicator");
    // Initial state should show unchecked visual
    expect(span).toHaveClass("left-0");

    // Click to toggle
    fireEvent.click(screen.getByRole("checkbox"));

    // Rerender with the "checked" state to simulate state change
    rerender(<ToggleButton isChecked={true} handleChange={handleChange} />);
    expect(span).toHaveClass(
      "absolute inset-y-0 left-0 m-1 size-6 rounded-full bg-white transition-all duration-300 ease-in-out peer-checked:left-6"
    );
  });
});
