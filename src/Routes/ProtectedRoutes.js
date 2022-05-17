import React from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";

function ProtectedRoutes({ component: Component, ...rest }) {
  // const { axiosJWT, url } = useAuth();
  // const logout = async (AToken) => {
  //   try {
  //     await axiosJWT.post(`${url}/logout`, {
  //       token: AToken,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Route
      {...rest}
      render={(props) => {
        const AToken = localStorage.getItem("AToken");
        if (AToken) {
          return <Component />;
        } else {
          // logout(AToken);
          // localStorage.clear();
          // return setTimeout(() =>
          return <Redirect to="/login" />;
          // , 5000);
        }
      }}
    />
  );
}

export default ProtectedRoutes;
