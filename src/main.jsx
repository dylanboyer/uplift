import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';

import { createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
const router = createBrowserRouter(createRoutesFromElements(Routes()));

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);