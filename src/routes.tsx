import { Route } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import LoggedOutLayout from "./layouts/logged-out-layout";
import Home from "./pages/home";
import NotFound from "./pages/404";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import PublicProfile from "./pages/public-profile";
import PrivateProfile from "./pages/private-profile";
import DataEntry from "./pages/data-entry";
import ProtectedRoute from "./components/protected-route";

const AppRoutes = (
  <Route>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<PrivateProfile />} />
        <Route path="/users/:user_id" element={<PublicProfile />} />
        <Route path="/entry" element={<DataEntry />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
    <Route element={<LoggedOutLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Route>
  </Route>
);

export default AppRoutes;
