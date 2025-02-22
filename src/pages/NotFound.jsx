import { Link } from "react-router-dom";

function NotFound() {
  return (
    // Link here to the home page using the router
    <div>
      <h1>Apologies! This page is not found.</h1>
      <h1>You can return to home <Link to ="/">here</Link></h1>
    </div>
  );
}

export default NotFound;
