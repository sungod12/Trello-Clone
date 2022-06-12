import React, { useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "../css/signIn.css";
import { useHistory } from "react-router-dom";

function Form({ typeOfForm }) {
  const [hidden, setHidden] = useState(true);
  const { register, login } = useAuth();
  const history = useHistory();
  const username = useRef("");
  const password = useRef("");
  const [properties, setProperties] = useState({ message: "", color: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    if (typeOfForm === "register") {
      const response = await register(username.current, password.current);
      // console.log(response);
      if (response === "Success") {
        setProperties({ message: "Success!", color: "green" });
        setTimeout(() => history.push("/login"), 7000);
      } else {
        setProperties({ message: `${response} !`, color: "red" });
      }
    } else {
      const response = await login(username.current, password.current);
      // console.log(response);
      if (response.status === "ok") {
        setProperties({ message: "Success!", color: "green" });
        setTimeout(() => history.push("/boards"), 7000);
      } else {
        setProperties({ message: `${response.error} !`, color: "red" });
      }
    }
    setHidden(false);
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="title">
        {typeOfForm === "register" ? "Register" : "Login"}
      </h1>
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
      <button
        type="submit"
        className="submit-button"
        disabled={!hidden}
        onClick={() => setTimeout(() => setHidden(true), 5000)}
        style={{ opacity: hidden ? 1 : 0.5 }}
      >
        Submit
      </button>
      {typeOfForm === "register" ? (
        <Link to="/login" style={{ margin: "0 auto" }}>
          Already Registered? Click here
        </Link>
      ) : (
        <Link to="/" style={{ margin: "0 auto" }}>
          Not Registered? Click here
        </Link>
      )}
      <div
        className="toast"
        hidden={hidden}
        style={{ backgroundColor: properties.color }}
      >
        {properties.message}
      </div>
    </form>
  );
}

export default Form;
