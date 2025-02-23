import { Link, Navigate, Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"; 
import { useLogout, useGetUserID } from "@/hooks/use-user"; 

export default function MainLayout() {
  const { userID, loading: userLoading, error: userError } = useGetUserID();
  const {
    logout,
    loading: logoutLoading,
    error: logoutError,
    isLoggedOut,
  } = useLogout();

  const handleLogout = () => {
    Navigate("/login");
    logout();
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="outline-indigo-600 outline-8 v-screen grid grid-cols-3 gap-4 h-[18vh] min-w-screen bg-zinc-900 w-full max-w-none mb-8">
        <div className="content-center p-4">
          <NavigationMenu className="flex justify-around">
            <NavigationMenuList>
              <NavigationMenuItem className="p-2">
                <Link to="/profile">
                  <div className="text-zinc-200 bg-zinc-900 hover:bg-indigo-600 hover:text-zinc-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg py-2 px-4 rounded-lg cursor-pointer">
                    Profile
                  </div>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="p-2">
                <Link to="/exercises">
                  <div className="text-zinc-200 bg-zinc-900 hover:bg-indigo-600 hover:text-zinc-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg py-2 px-4 rounded-lg cursor-pointer">
                    Add Exercises & Goals
                  </div>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="content-center">
          <Link to='/'>
            <h1 className="text-center text-6xl text-zinc-50">uplift.</h1>
          </Link>
        </div>
        <div className="flex justify-around content-center text-right p-6">
          <NavigationMenu className="flex justify-around ml-auto">
            <NavigationMenuList>
              <NavigationMenuItem className="p-2">
                <Link to="/search">
                  <div className="text-zinc-200 bg-zinc-900 hover:bg-indigo-600 hover:text-zinc-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg py-2 px-4 rounded-lg cursor-pointer">
                    Search User
                  </div>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="p-2">
                {userID && !isLoggedOut ? (
                  <Link to="/login">
                    <div
                      className="text-zinc-200 bg-zinc-900 hover:bg-indigo-600 hover:text-zinc-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg py-2 px-4 rounded-lg cursor-pointer"
                      onClick={handleLogout}
                      disabled={logoutLoading}
                    >
                      {logoutLoading ? "Logging out..." : "Logout"}
                    </div>
                  </Link>
                ) : null}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div>
        <main className="flex-grow p-4">
          <Outlet /> {/* Renders child routes here */}
        </main>
      </div>
    </div>
  );
}
