import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import { AuthProvider } from "./Context/AuthContext";
import ColumnList from "./Components/ColumnList";
import { ColumnProvider } from "./Context/ColumnDataContext";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <AuthProvider>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Register} />
        <ColumnProvider>
          <Route exact path="/boards/:boardName" component={ColumnList} />
        </ColumnProvider>
        <ProtectedRoutes exact path="/boards" component={App} />
      </AuthProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
