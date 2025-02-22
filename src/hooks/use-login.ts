import { useState } from "react";

interface LoginResponse {
  status: number;
  data?: any;
  error?: string;
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch("/backend/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsSuccess(true);
        return { status: response.status, data: await response.json() };
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
        return { status: response.status, error: errorData.error || "Login failed" };
      }
    } catch (err) {
      setError("An unexpected error occurred");
      return { status: 500, error: "An unexpected error occurred" };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, isSuccess };
};

export default useLogin;