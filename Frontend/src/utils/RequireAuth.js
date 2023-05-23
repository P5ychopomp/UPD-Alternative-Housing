import { Navigate, Outlet } from "react-router";
import { useAuth } from "./Auth";

export const RequireAuth = () => {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to ='/Landlord/Login' />  
};
