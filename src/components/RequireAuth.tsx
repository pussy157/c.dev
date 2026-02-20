import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isReady, user } = useAuth();
  const location = useLocation();

  if (!isReady) {
    return <div className="p-6 text-sm text-muted-foreground">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
