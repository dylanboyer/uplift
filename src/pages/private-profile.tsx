import { useGetUserID, useGetUserData } from "@/hooks/use-user"; // Assuming the hook is in a separate file
import { WidgetBox } from "@/components/widget";
import AccomplishmentsBox from "@/components/accomplishments";
import { ScrollArea } from "@/components/ui/scroll-area"; // Scrollable Area component for charts
import { useEffect, useState } from "react";
import { LoadingCircle } from "@/components/loading-circle";

import ActivityTracker from "@/components/activity-monitor";

export default function PrivateProfile() {
  const { userID } = useGetUserID(); // Use the custom hook

  // State for profile data
  const [profileData, setProfileData] = useState({
    name: "Loading...",
    username: "loading_user",
    email: "loading@example.com",
    pfp_url: "https://placehold.co/250x250",
    follower_count: 0,
  });

  const [ isLoading, setLoadingData ] = useState(true);
  // const [error_data, setErrorData] = useState(null);

  const { userData } = useGetUserData(userID); // Always call the hook

  useEffect(() => {
    if (userData) {
      setProfileData(userData); // Update profile data once fetched
      setLoadingData(false); // Stop loading once data is available
    }
    if (userID === null) {
      setLoadingData(false); // Stop loading if no userID is available
    }
  }, [userData]); // Run this effect whenever userData changes

  if (isLoading) {
    return (<LoadingCircle />)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-zinc-900 text-white">
      {/* Left Side: Profile + Accomplishments (combined in 2 rows) */}
      <div className="col-span-1 lg:col-span-1 grid grid-rows-[auto,auto] gap-6">
        {/* Profile Information */}
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg space-y-4">
          <div className="flex items-center space-x-6">
            <img
              src={profileData.pfp_url}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold text-white">{profileData.name}</h2>
              <p className="text-lg text-zinc-400">@{profileData.username}</p>
            </div>
          </div>
          <div className="mt-4 text-zinc-300">
            <p className="text-md">Email: {profileData.email}</p>
            <p className="text-md">Followers: {profileData.follower_count}</p>
          </div>
          <ActivityTracker/>
        </div>

        {/* Accomplishments Box */}
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg space-y-4">
          <AccomplishmentsBox user_id={userID} owner={true} />
        </div>
      </div>

      {/* Right Half: Widget Box takes the remaining space */}
      <div className="col-span-1 lg:col-span-1 bg-zinc-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Your Dashboard</h3>
        
        {/* Scrollable Area for Charts or other widgets */}
        <ScrollArea className="overflow-auto rounded-lg bg-zinc-700 p-4">
          <WidgetBox user_id={userID} col_num={1} />
        </ScrollArea>
      </div>
    </div>
  );
}
