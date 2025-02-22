import { Route } from "react-router-dom";

// Import the layout
import MainLayout from "./layouts/main-layout";

// Import all pages
import Home from "./pages/home";
import NotFound from "./pages/404";
import Login from "./pages/login";
import SignUp from "./pages/signup";

export default function Routes() {
  return (
    <Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Route>
  );
}
