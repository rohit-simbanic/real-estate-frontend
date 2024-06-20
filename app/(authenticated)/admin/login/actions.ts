import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  agentId: string;
}

export const loginAgent = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/agent/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to login. Please check your credentials.");
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error during login request:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
          "Failed to login. Please check your credentials."
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};
