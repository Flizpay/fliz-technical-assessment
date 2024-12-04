import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../components/index";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const ERROR_MESSAGE = "Email or password does not exist. Please register.";

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      if (data.success) {
        setUser(data);
        console.log("User logged in successfully:", data);
        navigate("/game");
      } else {
        setErrorMessage(ERROR_MESSAGE);
      }
    } catch (error) {
      console.error("User login failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(ERROR_MESSAGE);
      }
    }
  }

  return (
    <div>
      <h1>Game of Empires</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Login</button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/register";
          }}
        >
          Register
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};
