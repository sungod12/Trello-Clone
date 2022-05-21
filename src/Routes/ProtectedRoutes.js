import React from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";

function ProtectedRoutes({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const AToken = localStorage.getItem("AToken");
        if (AToken) {
          return <Component />;
        } else {
          localStorage.clear();
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default ProtectedRoutes;
