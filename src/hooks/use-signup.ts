import { useState } from "react";

interface SignupResponse {
  status: "ok" | "no";
  u_id?: string; // User ID returned on success
  error?: string; // Error message for failure
}

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const signup = async (
    name: string,
    email: string,
    username: string,
    password: string,
    verifyPassword: string
  ): Promise<SignupResponse> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    // Validate passwords match
    if (password !== verifyPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return { status: "no", error: "Passwords do not match" };
    }

    try {
      // Make the API request
      const response = await fetch("/backend/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, username, password }),
      });

      // Parse the response
      const result = await response.json();

      // Handle success
      if (response.ok && result.status === "ok") {
        setIsSuccess(true);
        return { status: "ok", u_id: result.u_id };
      }

      // Handle failure
      setError("Signup failed. Please try again.");
      return { status: "no", error: "Signup failed. Please try again." };
    } catch (err) {
      // Handle network or other errors
      setError("An error occurred. Please try again.");
      return { status: "no", error: "An error occurred. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, isSuccess, signup };
};

export default useSignup;
