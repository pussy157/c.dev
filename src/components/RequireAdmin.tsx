import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function RequireAdmin({ children }: { children: JSX.Element }) {
  const { isReady, user, role } = useAuth();
  const location = useLocation();

  if (!isReady) {
    return <div className="p-6 text-sm text-muted-foreground">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
}
