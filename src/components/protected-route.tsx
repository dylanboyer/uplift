import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/backend/users/session")
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.is_valid))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return null; // Prevent flashing

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
