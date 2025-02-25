import { useParams } from "react-router-dom";
import { useGetUserID, useGetUserData, useFollow } from "@/hooks/use-user";
import { WidgetBox } from "@/components/widget";
import React, { useState, useEffect } from "react";

import AccomplishmentsBox from "@/components/accomplishments";

export default function PublicProfile() {
  const { user_id } = useParams(); // Get user_id from the URL
  const { userID, loading_ses, error_ses } = useGetUserID(); // Get current user ID
  const { userData, loading_data, error_data } = useGetUserData(user_id); // Get public user data without refetch
  const { isFollowing: initialIsFollowing, toggleFollow, loading } = useFollow(user_id); // Don't pass refetch

  const [followers, setFollowers] = useState(userData?.follower_count || 0);
  const [followButtonText, setFollowButtonText] = useState("Follow");
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  // Sync button state once the `isFollowing` value is available
  useEffect(() => {
    if (userData && initialIsFollowing !== undefined) {
      setFollowers(userData?.follower_count); // Ensure followers count is based on userData initially
      setIsFollowing(initialIsFollowing); // Set following status from the hook
      setFollowButtonText(initialIsFollowing ? "Unfollow" : "Follow"); // Set button text based on following status
    }
  }, [userData, initialIsFollowing]);

  // Function to refresh follower count without refetching entire user data
  const handleRefresh = async () => {
    // Optimistic UI update
    setFollowers(prev => isFollowing ? prev - 1 : prev + 1); // Update follower count locally
    setFollowButtonText(isFollowing ? "Follow" : "Unfollow"); // Update follow button text
    setIsFollowing(!isFollowing); // Toggle following status

    // Call the toggleFollow API
    try {
      await toggleFollow(); // Wait for the follow/unfollow operation to complete
      // Optionally, refetch user data to ensure the backend and frontend are synced (if needed)
      // const updatedUserData = await fetchUserData(user_id);
      // setFollowers(updatedUserData.follower_count);
    } catch (error) {
      console.error("Error toggling follow:", error);
      // If there's an error, revert the local state change (optional)
      setFollowers(prev => isFollowing ? prev + 1 : prev - 1);
      setIsFollowing(isFollowing); // Revert follow status if toggle fails
      setFollowButtonText(isFollowing ? "Unfollow" : "Follow"); // Revert button text if needed
    }
  };

  if (loading_data) {
    return <p className="text-center text-gray-500">Loading user data...</p>;
  }

  if (error_data) {
    return <p className="text-center text-red-500">Error fetching user data</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-zinc-800 text-white rounded-lg shadow-lg">
      {/* User Info Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
        <div className="flex items-center space-x-6 mb-6 lg:mb-0">
          <img
            src={userData?.pfp_url}
            alt="User Profile Picture"
            className="w-40 h-40 rounded-full border-4 border-gray-500"
          />
          <div>
            <h1 className="text-3xl font-bold">{userData?.name}</h1>
            <p className="text-lg text-gray-400">@{userData?.username}</p>
            <p className="text-gray-500">Email: {userData?.email}</p>
            <p className="text-gray-500">Followers: {followers}</p> {/* Use local state for follower count */}
          </div>
        </div>

        {/* Follow/Unfollow Button */}
        {userID !== user_id && (
          <button
            onClick={handleRefresh} // Directly call toggleFollow and update follower count
            disabled={loading}
            className={`px-6 py-3 rounded-full font-semibold transition-all 
              ${isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} 
              ${loading ? "opacity-50 cursor-not-allowed" : "text-white"}`}
          >
            {loading ? "Processing..." : followButtonText} {/* Use local state for button text */}
          </button>
        )}
      </div>

      {/* Bio Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Bio</h2>
        <p className="text-gray-300">
          {userData?.bio || "This user has not added a bio yet."}
        </p>
      </div>

      {/* Accomplishments Section */}
      <div className="mb-8">
        <AccomplishmentsBox user_id={user_id} owner={false} />
      </div>

      {/* Widgets Section */}
      <WidgetBox user_id={user_id} col_num={2} />
    </div>
  );
}
