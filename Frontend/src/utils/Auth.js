import Axios from "axios";
import { createContext, useContext, useState } from "react";
import { fetchAuth } from "./FetchAuth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

<<<<<<< Updated upstream
  const login = async (user) => {
    if (!user) {
      await Axios.get(`${fetchAuth}/api/check-authentication`).then(
        (response) => {
          setUser(response.data.isAuthenticated);
        }
      );
    }
=======
  const login = async () => {
    await Axios.get(`${fetchAuth}/api/check-authentication`).then(
      (response) => {
        console.log(response.data.isAuthenticated);
        setUser(response.data.isAuthenticated);
      }
    );
>>>>>>> Stashed changes
  };

  const logout = async () => {
    await Axios.post(`${fetchAuth}/logout`).then((response) => {
      if (response.status === 200) {
        console.log(response.data.isAuthenticated);
        setUser(response.data.isAuthenticated);
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
