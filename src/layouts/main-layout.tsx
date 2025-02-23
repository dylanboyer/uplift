import { Link, Navigate, Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"; // Adjust import based on your file structure
import { Button } from "@/components/ui/button";
import { useLogout, useGetUserID } from "@/hooks/use-user"; // Import the logout hook

export default function MainLayout() {
  const { userID, loading: userLoading, error: userError } = useGetUserID(); // Check if the user is logged in
  const { logout, loading: logoutLoading, error: logoutError, isLoggedOut } = useLogout(); // Logout functionality

  const handleLogout = () => {
    Navigate("/login"); // Redirect to the login page after logging out
    logout(); // Trigger the logout process
  };

  // If still loading user data, show a loading state
  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="outline-amber-300 outline-8 v-screen grid grid-cols-3 gap-4 h-[18vh] min-w-screen bg-zinc-900 w-full max-w-none mb-8">
        <div className="content-center p-4">
          <NavigationMenu className="flex justify-around">
            <NavigationMenuList>
              <NavigationMenuItem className="p-2">
                <Link to="/analytics">
                  <Button className=" text-zinc-800 bg-zinc-200">
                    Analytics
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="p-2">
                <Link to="/entry">
                  <Button className=" text-zinc-800 bg-zinc-200">
                    Entry
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="p-2">
                <Link to="/profile">
                  <Button className=" text-zinc-800 bg-zinc-200">
                    Profile
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="p-2">
                <Link to="/goals">
                  <Button className="text-zinc-800 bg-zinc-200">
                    Goals
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="content-center">
          <h1 className="text-center text-6xl text-zinc-50">uplift.</h1>
        </div>
        <div className="content-center text-right p-6">
          {/* Render the logout button only if the user is logged in */}
          {userID && !isLoggedOut && (
            <Link to="/login">
              <Button
                className="text-zinc-800 bg-zinc-200"
                onClick={handleLogout}
                disabled={logoutLoading} // Disable the button while logging out
              >
                {logoutLoading ? "Logging out..." : "Logout"} {/* Show loading text if logging out */}
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div>
        <main className="flex-grow p-4">
          {/* This will take the remaining height */}
          <Outlet /> {/* Renders child routes here */}
        </main>
      </div>
    </div>
  );
}