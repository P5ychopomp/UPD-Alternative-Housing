import { Navigate, Outlet } from "react-router";
import { useAuth } from "./Auth";
import Axios from "axios";
import { fetchAuth } from "./FetchAuth";
import { useEffect, useState } from "react";

export const RequireAuth = () => {
  const auth = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    Axios.get(`${fetchAuth}/api/check-authentication`).then((response) => {
      console.log(response.data.isAuthenticated);
      setUser(response.data.isAuthenticated);
    });
  }, [user, setUser]);

  return (user || auth.user) ? <Outlet /> : <Navigate to="/Landlord/Login" />;
};
