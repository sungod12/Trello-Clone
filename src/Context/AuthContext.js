import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { useHistory } from "react-router-dom";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const history = useHistory();
  const url = "http://localhost:3001";
  const axiosJWT = Axios.create();
  const [expired, setExpired] = useState(false);

  axiosJWT.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem("AToken")}`,
  };

  // const checkToken = async () => {
  //   const res = await axiosJWT.post(`${url}/verify`);
  //   const { message } = res.data;
  //   // console.log(message);
  //   if (message === "ok") {
  //     return;
  //   } else {
  //     localStorage.removeItem("AToken");
  //     history.push("/login");
  //   }
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     checkToken();
  //   }, 1000);
  //   return () => clearTimeout(timer);
  //   // eslint-disable-next-line
  // });

  useEffect(() => {
    const timer = setInterval(async () => {
      // console.log("running");
      let currentDate = new Date();
      const aToken = localStorage.getItem("AToken");
      try {
        const data = jwt_decode(aToken);
        // console.log(data);
        if (data.exp * 1000 < currentDate.getTime()) {
          console.log("expired");
          setExpired(true);
          localStorage.clear();
          history.replace("/login");
          const res = await axiosJWT.post(`${url}/logout`);
          alert(res.data.message);
        }
      } catch (err) {
        return;
      }
    }, 10000);
    // clearInterval(timer);
    return () => {
      // setExpired(false);
      clearInterval(timer);
    };

    // eslint-disable-next-line
  }, [expired]);

  const login = async (username, password) => {
    try {
      const result = await axiosJWT.post(`${url}/login`, {
        username,
        password,
      });
      const { token, status } = result.data;
      localStorage.setItem("AToken", token);
      if (status === "ok") {
        history.push({
          pathname: "/boards",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    login,
    AToken: localStorage.getItem("AToken"),
    url,
    axiosJWT,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContext;
