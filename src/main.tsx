import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes.tsx";
import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(Routes()));

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
					{/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
						<RouterProvider router={router} />
					{/* </ThemeProvider> */}
	</React.StrictMode>

  
);
