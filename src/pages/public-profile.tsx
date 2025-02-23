import { useParams } from "react-router-dom";
import { useGetUserID } from "@/hooks/use-user"; // Assuming the hook is in a separate file
import {Widget, WidgetBox} from "@/components/widget";

import "@/components/widget.css";

export default function PublicProfile() {
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

  console.log(userID)

  return (
    <div>
      <h1>Public page</h1>
      <WidgetBox user_id={user_id} />
    </div>
  );
}

