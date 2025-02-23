import { useState, useEffect } from "react";

interface LoginResponse {
  status: number;
  data?: any;
  error?: string;
}

export const useGetUserID = () => {
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const response = await fetch("/backend/users/session", {
          credentials: "include", // Ensure cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }

        const data = await response.json();

        if (data.is_valid) {
          setUserID(data.user_id); // Set the user_id if the session is valid
        } else {
          setUserID(null); // Set user_id to null if the session is invalid
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserID();
  }, []);

  return { userID, loading, error };
};

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
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
        return {
          status: response.status,
          error: errorData.error || "Login failed",
        };
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

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/backend/users/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent with the request
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      setIsLoggedOut(true); // Logout was successful
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error, isLoggedOut };
};

export const useGetUserData = (user_id) => {
  const [userData, setUserData] = useState(null);
  const [loading_data, setLoading] = useState(true);
  const [error_data, setError] = useState(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/backend/users/${user_id}`, {
        credentials: "include", // Ensure cookies are sent with the request
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log(data);
      setUserData(data[0]);

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount and when user_id changes
  useEffect(() => {
    console.log('update')
    fetchUserData();
  }, [user_id]);

  return { userData, loading_data, error_data, refetch: fetchUserData };
};


export const useGetAllUsersForSearch = (user_id) => {
  const [searchData, setSearchData] = useState(null);
  const [loading_data, setLoading] = useState(true);
  const [error_data, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/backend/users/all", {
          credentials: "include", // Ensure cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }

        const data = await response.json();
        console.log(data)
        setSearchData(data); // Set the user_id if the session is valid

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { searchData, loading_data, error_data };
};

export const useFollow = (userId) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the current user is following this user
  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const response = await fetch(`/backend/users/is_following/${userId}`);
        const data = await response.json();
        setIsFollowing(data.isFollowing);
      } catch (error) {
        console.error("Error checking follow status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkFollowingStatus();
  }, [userId]);

  // Function to toggle follow/unfollow
  const toggleFollow = async () => {
    try {
      const response = await fetch(
        `/backend/users/${isFollowing ? "unfollow" : "follow"}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ u_id: userId }),

        }
      );

      if (response.ok) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return { isFollowing, toggleFollow, loading };
};
