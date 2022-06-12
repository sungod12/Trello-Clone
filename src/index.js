import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import { AuthProvider } from "./Context/AuthContext";
import ColumnList from "./Components/ColumnList";
import { ColumnProvider } from "./Context/ColumnDataContext";
import Form from "./Components/Form";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <AuthProvider>
        <Route exact path="/">
          <Form typeOfForm="register" />
        </Route>
        <Route exact path="/login">
          <Form typeOfForm="login" />
        </Route>
        <ColumnProvider>
          <Route exact path="/boards/:boardName" component={ColumnList} />
        </ColumnProvider>
        <ProtectedRoutes exact path="/boards" component={App} />
      </AuthProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
