import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Widget from "@/components/widget";
import EntryManager from "@/components/entry_manager";

import "@/components/widget.css";

export default function Profile() {
  const { user_id } = useParams(); // Get user_id from the URL
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [sessionUserId, setSessionUserId] = useState<number | null>(null);

  // Fetch session data on load
  useEffect(() => {
    fetch("/backend/users/session")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.is_valid);
        setSessionUserId(data.user_id); // Assuming the backend returns user_id
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  // If session is still being checked, show loading state
  if (isAuthenticated === null) {
    return <p>Loading session data...</p>;
  }

  // Check if the current profile is the logged-in user's profile
  const isOwnProfile = sessionUserId === parseInt(user_id);

  return (
    <div>
      <h1>{isOwnProfile ? "Your Profile" : "Public Profile"}</h1>
      <div className="widgetBox">
        {/* Show private profile widgets if it's the user's own profile */}
        {isOwnProfile ? (
          <>
            <Widget exerciseId="1" />
            <Widget exerciseId="2" />
            <Widget exerciseId="3" />
          </>
        ) : (
          // Show public profile widgets for other users
          <>
            <Widget exerciseId="4" />
            <Widget exerciseId="5" />
          </>
        )}
      </div>
    </div>
  );
}
