import { useParams } from "react-router-dom";
import { useGetUserID, useGetUserData } from "@/hooks/use-user"; // Assuming the hook is in a separate file
import { Widget, WidgetBox } from "@/components/widget";
import "@/components/widget.css";

export default function PublicProfile() {
  const { user_id } = useParams(); // Get user_id from the URL
  const { userID, loading_ses, error_ses } = useGetUserID(); // Use the custom hook
  const { userData, loading_data, error_data } = useGetUserData(user_id); // Get the user_data

  // If user data is still being loaded, show loading state
  if (loading_data) {
    return <p className="text-center text-gray-500">Loading user data...</p>;
  }

  // Handle errors if fetching user data fails
  if (error_data) {
    return <p className="text-center text-red-500">Error fetching user data</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-zinc-800 text-white rounded-lg shadow-lg">
      {/* User Info Section */}
      <div className="flex items-center space-x-4 mb-8">
        <img 
          src={userData?.pfp_url} 
          alt="User Profile Picture" 
          className="w-32 h-32 rounded-full border-4 border-gray-500" 
        />
        <div>
          <h1 className="text-3xl font-bold">{userData?.name}</h1>
          <p className="text-lg text-gray-400">@{userData?.username}</p>
          <p className="text-gray-500">Email: {userData?.email}</p>
          <p className="text-gray-500">Followers: {userData?.follower_count}</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Bio</h2>
        <p className="text-gray-300">
          {/* Add bio text here if available */}
          {userData?.bio || "This user has not added a bio yet."}
        </p>
      </div>

      {/* Display widgets for the user */}
      <WidgetBox user_id={user_id} />
    </div>
  );
}
