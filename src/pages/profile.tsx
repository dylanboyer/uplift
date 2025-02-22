import { useParams } from "react-router-dom";
import { useGetUserID } from "@/hooks/useGetUserID"; // Assuming the hook is in a separate file
import Widget from "@/components/widget";

import "@/components/widget.css";

export default function ProfileRouter() {
  const { user_id } = useParams(); // Get user_id from the URL
  const { userID, loading, error } = useGetUserID(); // Use the custom hook

  // If session is still being checked, show loading state
  if (loading) {
    return <p>Loading session data...</p>;
  }

  // Handle errors if fetching session data fails
  if (error) {
    return <p>Error fetching session data</p>;
  }

  // Check if the current profile is the logged-in user's profile
  const isOwnProfile = userID === parseInt(user_id);

  return (
    <div>
      {/* Show private profile widgets if it's the user's own profile */}
      {isOwnProfile ? (
        <PrivateProfile />
      ) : (
        // Show public profile widgets for other users
        <PublicProfile />
      )}
    </div>
  );
}

function PublicProfile() {
  return (
    <div>
      <h1>Public page</h1>
    </div>
  );
}

function PrivateProfile() {
  return (
    <div>
      <h1>Private page</h1>
    </div>
  );
}
