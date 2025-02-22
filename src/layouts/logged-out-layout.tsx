import { Outlet } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"; // Adjust import based on your file structure

export default function LoggedOutLayout() {
  return (
    <div>
      {/* Header Section */}
      <div className="content-center outline-amber-300 outline-8 v-screen gap-4 h-[18vh] min-w-screen bg-zinc-900 w-full max-w-none mb-8">
        <h1 className="text-center text-6xl text-zinc-50">uplift.</h1>
      </div>

      {/* Main Content Section */}
      <div>
        <main className="flex-grow p-4">
          <Outlet /> {/* Renders child routes here */}
        </main>
      </div>
    </div>
  );
}
