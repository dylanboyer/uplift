import { useParams } from "react-router-dom";
import { useGetUserID, useGetUserData } from "@/hooks/use-user"; // Assuming the hook is in a separate file
import { Link } from "react-router-dom"; // Import Link for navigation

export default function SearchUsers() {

	return (
		<div>
			<UserEntry user_id={'1'} />
		</div>
	)
}

export function UserEntry({ user_id }: { user_id: string }) {
  // Fetch user data using the custom hook
  const { userData, loading_data, error_data } = useGetUserData(user_id);

  // Loading state
  if (loading_data) {
    return <p className="text-center text-white">Loading user data...</p>;
  }

  // Error handling
  if (error_data) {
    return <p className="text-center text-red-500">Error fetching user data: {error_data.message}</p>;
  }

  return (
    <Link to={`/users/${user_id}`}>
      <div className="p-6 max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg space-y-4 cursor-pointer hover:bg-gray-700 transition-colors">
        {/* Display user's profile picture and basic information */}
        <div className="flex items-center space-x-4">
          <img
            src={userData.pfp_url}
            alt={`${userData.name}'s profile picture`}
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
            <p className="text-lg text-gray-400">@{userData.username}</p>
            <p className="text-sm text-gray-300">{userData.follower_count} followers</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

