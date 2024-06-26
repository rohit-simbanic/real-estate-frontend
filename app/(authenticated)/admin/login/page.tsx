"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";
import InputField from "./components/input-field";
import { loginAgent } from "./actions";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginAgent: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const result = await loginAgent(data);
      login(result.token, result.agentId);
      router.push("/admin");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Your password does not match";
      if (err.response?.data?.field) {
        // Set error for a specific field if available
        setError(err.response.data.field, {
          type: "server",
          message: errorMessage,
        });
      } else {
        // Set general form error
        setError("password", {
          type: "server",
          message: errorMessage,
        });
      }
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto py-12 px-3">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Agent Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            required
            error={errors.email}
          />
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className={`mt-1 p-2 border border-gray-300 rounded w-full focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-1 text-gray-700"
              >
                {showPassword ? (
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 64 64"
                    enable-background="new 0 0 64 64"
                  >
                    <path
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      d="M1,32c0,0,11,15,31,15s31-15,31-15S52,17,32,17
                 S1,32,1,32z"
                    />
                    <circle
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      cx="32"
                      cy="32"
                      r="7"
                    />
                    <line
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      x1="9"
                      y1="55"
                      x2="55"
                      y2="9"
                    />
                  </svg>
                ) : (
                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 60.254 60.254"
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="M29.008,48.308c-16.476,0-28.336-17.029-28.833-17.754c-0.248-0.36-0.231-0.841,0.039-1.184
                     c0.561-0.712,13.906-17.424,29.913-17.424c17.953,0,29.474,16.769,29.956,17.482c0.23,0.342,0.229,0.79-0.007,1.129
                     c-0.475,0.688-11.842,16.818-29.899,17.721C29.786,48.297,29.396,48.308,29.008,48.308z M2.267,30.028
                     c2.326,3.098,13.553,16.967,27.812,16.254c15.237-0.76,25.762-13.453,27.938-16.3c-2.175-2.912-12.811-16.035-27.889-16.035
                     C16.7,13.947,4.771,27.084,2.267,30.028z"
                          />
                        </g>
                        <g>
                          <path
                            d="M30.127,37.114c-3.852,0-6.986-3.135-6.986-6.986c0-3.851,3.134-6.985,6.986-6.985s6.986,3.135,6.986,6.985
                     C37.113,33.979,33.979,37.114,30.127,37.114z"
                          />
                        </g>
                        <g>
                          <path
                            d="M30.127,42.614c-6.885,0-12.486-5.602-12.486-12.486c0-6.883,5.602-12.485,12.486-12.485
                     c6.884,0,12.486,5.602,12.486,12.485C42.613,37.012,37.013,42.614,30.127,42.614z M30.127,19.641
                     c-5.782,0-10.486,4.704-10.486,10.486c0,5.781,4.704,10.485,10.486,10.485s10.486-4.704,10.486-10.485
                     C40.613,24.345,35.91,19.641,30.127,19.641z"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAgent;
