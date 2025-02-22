import { Route } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import Home from "./pages/home";
import NotFound from "./pages/404";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/protected-route";

const AppRoutes = (
  <Route>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </Route>
);

export default AppRoutes;
