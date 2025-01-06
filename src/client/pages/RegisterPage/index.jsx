import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { HouseOfThrones } from "../../components";

export const RegisterPage = () => {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();

    if (!selectedHouse) {
      alert("Please select a house.");
      return;
    }

    try {
      const response = await axios.post("/api/register", {
        nickname,
        name,
        email,
        password,
        house: selectedHouse,
      });
      console.log("User registered successfully:", response.data);
      alert("User registered successfully");
    } catch (error) {
      console.error("User registration failed:", error);
      alert("User registration failed");
    }
  }

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <HouseOfThrones
          selectedHouse={selectedHouse}
          setSelectedHouse={setSelectedHouse}
        />
        <div>
          <label>Nickname:</label>
          <input
            type="text"
            name="nickname"
            placeholder="nickname"
            value={nickname}
            onChange={(ev) => setNickname(ev.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="username"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="*******"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
        <p>
          If you have an account please <Link to={"/"}>Login</Link>
        </p>
      </form>
    </div>
  );
};
