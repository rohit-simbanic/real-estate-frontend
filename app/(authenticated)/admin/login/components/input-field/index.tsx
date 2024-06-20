import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  error?: FieldError | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  register,
  required = false,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className={`mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default InputField;
