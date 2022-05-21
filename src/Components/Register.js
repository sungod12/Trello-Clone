import React, { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "../css/signIn.css";

function Register() {
  const { register } = useAuth();
  const username = useRef("");
  const password = useRef("");

  async function registerUser(event) {
    event.preventDefault();

    await register(username.current, password.current);
  }

  return (
    <form onSubmit={registerUser} className="login-container">
      <h1 className="title">Register</h1>
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
      <Link to="/login" style={{ margin: "0 auto" }}>
        Already Registered? Click here
      </Link>
    </form>
  );
}

export default Register;
