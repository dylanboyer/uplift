import { Link, Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"; // Adjust import based on your file structure
import { Button } from "@/components/ui/button";

export default function MainLayout() {
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
        <Link to="/goals">
                <Button className=" text-zinc-800 bg-zinc-200">
                    Settings
                  </Button>
                </Link>
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
