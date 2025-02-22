import { useParams } from "react-router-dom";
import { useGetUserID } from "@/hooks/use-user"; // Assuming the hook is in a separate file
import { useGetUsedExercises } from "@/hooks/use-exercise";
import Widget from "@/components/widget";

import "@/components/widget.css";

export default function PrivateProfile() {
  const { userID, loading_user, error_user } = useGetUserID(); // Use the custom hook
  const { exercises, loading_ex, error_ex } = useGetUsedExercises();

  // If session is still being checked, show loading state
  if (loading_user || loading_ex) {
    return <p>Loading session data...</p>;
  }

  // Handle errors if fetching session data fails
  if (error_user || error_ex) {
    return <p>Error fetching session data</p>;
  }
  console.log(userID)
  console.log(exercises)

  return (
    <div>
      <h1>Private page</h1>
    </div>
  );
}