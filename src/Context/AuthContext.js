import React, { useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const history = useHistory();
  const url = process.env.REACT_APP_API_BASE_URL;
  const axiosJWT = Axios.create();

  axiosJWT.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("AToken")}`,
  };

  const checkExpiry = async (next) => {
    const response = await axiosJWT.get(`${url}/verify`);
    if (response.data.message === "ok") next();
    else {
      await axiosJWT.post(`${url}/logout`, {
        token: localStorage.getItem("AToken"),
      });
      localStorage.clear();
      history.replace("/login");
    }
  };

  const login = async (username, password) => {
    try {
      const result = await axiosJWT.post(`${url}/login`, {
        username,
        password,
      });
      const { token, status } = result.data;
      localStorage.setItem("AToken", token);
      if (status === "ok") {
        history.push("/boards");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (username, password) => {
    const result = await Axios.post(`${url}/register`, {
      username,
      password,
    }).then((res) => res);

    if (result.data.status === "ok") {
      // everything went fine
      alert("Success");
    } else {
      alert(result.data.error);
    }
  };
  const value = {
    login,
    register,
    AToken: localStorage.getItem("AToken"),
    url,
    axiosJWT,
    checkExpiry,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContext;
