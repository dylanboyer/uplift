import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import AppRoutes from "./routes";

const router = createBrowserRouter(createRoutesFromElements(AppRoutes));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex h-screen w-screen bg-zinc-800 text-zinc-100 font-sans">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
