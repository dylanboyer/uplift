import { useParams } from "react-router-dom";
import { useGetUserID, useGetUserData } from "@/hooks/use-user"; // Assuming the hook is in a separate file
import { useGetUsedExercises } from "@/hooks/use-exercise";
import { Widget, WidgetBox } from "@/components/widget";
import AccomplishmentsBox from "@/components/accomplishments";
import { ScrollArea } from "@/components/ui/scroll-area"; // Scrollable Area component for charts

export default function PrivateProfile() {
  const { userID, loading_user, error_user } = useGetUserID() | null; // Use the custom hook
  // const { userData, loading_data, error_data } = useGetUserData(userID);

  // Placeholder user data
  const placeholderData = {
    name: "Loading...",
    username: "loading_user",
    email: "loading@example.com",
    pfp_url: "https://placehold.co/250x250",
    follower_count: 0,
  };

  // Use placeholder data for now
  const profileData = placeholderData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-zinc-900 text-white">
      {/* Left Side: Profile + Accomplishments */}
      <div className="col-span-10 lg:col-span-2 grid grid-rows-[auto,1fr] gap-4">
        {/* Upper Left: Profile Information */}
        <div className="row-span-1 bg-zinc-800 p-6 rounded-lg shadow-md space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={profileData.pfp_url}
              alt="Profile Picture"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-lg text-zinc-400">@{profileData.username}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-md">Email: {profileData.email}</p>
            <p className="text-md">Followers: {profileData.follower_count}</p>
          </div>
        </div>
        
        {/* Lower Left: Accomplishments Box */}
        <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Accomplishments</h3>
          <AccomplishmentsBox user_id={userID}/>
        </div>
      </div>

      {/* Right Half: Widget Box takes the remaining space */}
      <div className="col-span-1 lg:col-span-2 bg-zinc-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Your Dashboard</h3>
        
        {/* Scrollable Area for Charts or other widgets */}
        <ScrollArea className="h-full overflow-auto">
          <WidgetBox user_id={userID} col_num={1}/>
        </ScrollArea>
      </div>
    </div>
  );
};
