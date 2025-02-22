import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(Routes()));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex h-screen v-screen bg-zinc-800 text-zinc-100 font-sans ">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
