import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthClient } from "../services/auth.client";

export default function ProtectedRoute() {
  const token = getAuthClient().getToken();
  const loc = useLocation();
  if (!token)
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  return <Outlet />;
}
