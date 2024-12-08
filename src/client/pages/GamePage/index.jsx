import React, { useState, useEffect } from "react";
import { Header, Loader } from "../../components/index";

export const GamePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Show loader for 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleAttack = () => {
    setScore(score + 10);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {isLoading ? (
        <Loader delay={5000} onFinish={() => setIsLoading(false)} /> // Show loader when loading
      ) : (
        <div>
          <Header />
          <h1>Game of Empires</h1>
          <p>Score: {score}</p>
          <button onClick={handleAttack}>Attack</button>
        </div>
      )}
    </div>
  );
};
