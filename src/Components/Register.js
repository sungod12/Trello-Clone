import React from "react";
import Axios from "axios";
import { useAuth } from "../Context/AuthContext";

function Register() {
  const { url } = useAuth();
  async function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

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
  }

  return (
    <div>
      <h1>Registration</h1>
      <form id="reg-form" onSubmit={registerUser}>
        <input
          type="text"
          autoComplete="off"
          id="username"
          placeholder="Username"
        />
        <input
          type="password"
          autoComplete="off"
          id="password"
          placeholder="Password"
        />
        <input type="submit" value="Submit Form" />
      </form>
    </div>
  );
}

export default Register;
