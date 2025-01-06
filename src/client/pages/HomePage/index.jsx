import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Logo from "../../../assets/images/game_of_thrones_logo.jpg";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="homePage">
      <img src={Logo} alt="Game Logo" className="logo" />
      <h1 className="title">Game of Empires</h1>
      <p className="description">
        Welcome to the Game of Empires! To play, you need to build your empire,
        gather resources, and conquer your enemies. Are you ready to become the
        ultimate ruler?
      </p>
      <div className="buttons">
        <button className="button" onClick={handleLoginClick}>
          Login
        </button>
        <button className="button" onClick={handleRegisterClick}>
          Register
        </button>
      </div>
    </div>
  );
};
