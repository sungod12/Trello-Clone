import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "../css/signIn.css";

const Login = () => {
  const username = useRef("");
  const password = useRef("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username.current, password.current);
  };

  // eslint-disable-next-line

  return (
    <form onSubmit={handleSubmit} className="login-container">
      <h1 className="title">Sign In</h1>
      <input
        type="text"
        name="username"
        className="userName"
        ref={username}
        onChange={(e) => {
          username.current = e.target.value;
        }}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        className="password"
        ref={password}
        autoComplete="false"
        placeholder="Password"
        onChange={(e) => {
          password.current = e.target.value;
        }}
        required
      />
      <button type="submit" className="signIn-button">
        Submit
      </button>
      <Link to="/" style={{ margin: "0 auto" }}>
        Not Registered? Click here
      </Link>
    </form>
  );
};

export default Login;
