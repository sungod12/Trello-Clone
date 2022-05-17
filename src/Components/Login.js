import React, { useRef } from "react";
import { useAuth } from "../Context/AuthContext";

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
    <>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          ref={username}
          onChange={(e) => {
            username.current = e.target.value;
          }}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          ref={password}
          autoComplete={false}
          onChange={(e) => {
            password.current = e.target.value;
          }}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
