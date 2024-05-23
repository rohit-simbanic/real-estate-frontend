import React from "react";

interface ToggleButtonProps {
  isChecked: boolean;
  handleChange: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isChecked,
  handleChange,
}) => {
  return (
    <label
      htmlFor="AcceptConditions"
      className="relative h-8 w-14 cursor-pointer rounded-full dark:bg-gray-300 bg-black transition [-webkit-tap-highlight-color:_transparent] peer-checked:bg-green-500"
    >
      <input
        type="checkbox"
        id="AcceptConditions"
        className="peer sr-only"
        checked={isChecked}
        onChange={handleChange}
      />
      <span
        className="absolute inset-y-0 left-0 m-1 size-6 rounded-full bg-white transition-all duration-300 ease-in-out peer-checked:left-6"
        data-testid="toggle-indicator"
      ></span>
    </label>
  );
};

export default ToggleButton;
