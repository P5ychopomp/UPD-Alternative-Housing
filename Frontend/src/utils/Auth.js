import Axios from "axios";
import { createContext, useContext, useState } from "react";
import { fetchAuth } from "./FetchAuth";
import { fetchBaseUrl } from "./FetchBaseUrl";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("key"));
  const [props, setProps] = useState([]);
  const [prop, setProp] = useState(null);
  const [Id, setId] = useState(null);

  const login = async () => {
    await Axios.get(`${fetchAuth}/api/check-authentication`).then(
      (response) => {
        setUser(response.data.isAuthenticated);
        localStorage.setItem("key", response.data.isAuthenticated);
        setId(localStorage.getItem("id"));
        const getUserListings = async () => {
          await Axios.get(`${fetchBaseUrl}?lid=${Id}`).then((res) => {
            setProps(res.data);
          });
        };
        getUserListings();
      }
    );
  };

  const getProps = async (pid) => {
    await Axios.get(`${fetchBaseUrl}?pid=${pid}`).then((res) => {
      setProp(res?.data[0]);
    });
  };

  const logout = async () => {
    await Axios.post(`${fetchAuth}/logout`).then((response) => {
      if (response.status === 200) {
        setUser(response.data.isAuthenticated);
        setProps([]);
        localStorage.clear();
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, getProps, props, prop, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
