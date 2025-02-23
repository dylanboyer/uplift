import { useParams } from "react-router-dom";
import { useGetUserID } from "@/hooks/use-user"; // Assuming the hook is in a separate file
import { useGetUsedExercises } from "@/hooks/use-exercise";
import {Widget, WidgetBox} from "@/components/widget";


export default function PrivateProfile() {
  const { userID, loading_user, error_user } = useGetUserID(); // Use the custom hook
  

  // If session is still being checked, show loading state
  if (loading_user) {
    return <p>Loading session data...</p>;
  }

  // Handle errors if fetching session data fails
  if (error_user) {
    return <p>Error fetching session data</p>;
  }
  console.log(userID)

  return (
    <div>
      <h1>Private page</h1>
      <WidgetBox user_id={userID} />
    </div>
  );
}