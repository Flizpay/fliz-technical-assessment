import React, { useState } from "react";
import { Header } from "../../components/index";

export const GamePage = () => {
  const [score, setScore] = useState(0);

  const handleAttack = () => {
    setScore(score + 10);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <Header />
      <h1>Game of Empires</h1>
      <p>Score: {score}</p>
      <button onClick={handleAttack}>Attack</button>
    </div>
  );
};
