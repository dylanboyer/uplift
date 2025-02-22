import { Route } from "react-router-dom";

// Import layout
import MainLayout from "./layouts/main-layout";

// Import all pages
import Home from "./pages/Home";

export default function Routes() {
	return (
		<Route element={<MainLayout />}>
			<Route path="/" element={<Home />} />
		</Route>
	);
}
