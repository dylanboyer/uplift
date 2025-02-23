import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserData, useGetAllUsersForSearch } from "@/hooks/use-user"; // Assuming the hook is in a separate file
import { Link } from "react-router-dom"; // Import Link for navigation

export default function SearchUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user_id } = useParams(); // Assuming you are getting user_id from params

  // State to hold fetched user data
  const { searchData, loading_data, error_data } = useGetAllUsersForSearch();

  // Loading state
  if (loading_data) {
    return <p className="text-center text-white">Loading...</p>;
  }

  // Error handling
  if (error_data) {
    return <p className="text-center text-red-500">Error fetching user data: {error_data.message}</p>;
  }

  // Filter the list of users based on the search query
  const filteredUsers = searchData?.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

	return (
	  <div className="p-6 max-w-4xl mx-auto bg-zinc-800 rounded-xl space-y-6">
	    {/* Search Bar */}
	    <input
	      type="text"
	      placeholder="Search users..."
	      className="w-full p-3 bg-zinc-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
	      value={searchQuery}
	      onChange={(e) => setSearchQuery(e.target.value)}
	    />

	    {/* Conditionally render filtered users only if there is a search query */}
	    {searchQuery && (
	      <div className="space-y-4">
	        {filteredUsers && filteredUsers.length > 0 ? (
	          filteredUsers.map((user) => (
	            <UserEntry key={user.u_id} user_id={user.u_id} />
	          ))
	        ) : (
	          <p className="text-center text-white">No users found.</p>
	        )}
	      </div>
	    )}
	  </div>
	);
}

export function UserEntry({ user_id }: { user_id: string }) {
  const { userData, loading_data, error_data } = useGetUserData(user_id);

  // If user data is not available yet, show loading indicator but keep the component mounted
  if (loading_data) {
    return (
      <div className="p-6 max-w-4xl mx-auto bg-zinc-700 rounded-xl shadow-lg space-y-4 cursor-pointer hover:bg-zinc-600 transition-colors">
        <div className="flex items-center space-x-6 animate-pulse">
          <div className="w-24 h-24 rounded-full bg-zinc-500" /> {/* Placeholder for profile image */}
          <div className="space-y-2">
            <div className="h-6 bg-zinc-500 rounded w-32" /> {/* Placeholder for name */}
            <div className="h-4 bg-zinc-400 rounded w-24" /> {/* Placeholder for username */}
            <div className="h-4 bg-zinc-400 rounded w-32" /> {/* Placeholder for follower count */}
          </div>
        </div>
      </div>
    );
  }

  // Error handling
  if (error_data) {
    return <p className="text-center text-red-500">Error fetching user data: {error_data.message}</p>;
  }

  return (
    <Link to={`/users/${user_id}`}>
      <div className="p-6 max-w-4xl mx-auto bg-zinc-800 rounded-xl shadow-lg space-y-4 cursor-pointer hover:bg-zinc-700 transition-colors">
        {/* Display user's profile picture and basic information */}
        <div className="flex items-center space-x-6">
          <img
            src={userData.pfp_url}
            alt={`${userData.name}'s profile picture`}
            className="w-24 h-24 rounded-full border-2 border-white"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
            <p className="text-lg text-zinc-400">@{userData.username}</p>
            <p className="text-sm text-zinc-300">{userData.follower_count} followers</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
