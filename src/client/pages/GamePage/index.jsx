import React, { useState, useEffect } from "react";
import { Header, Loader, MapGrid } from "../../components/index";

export const GamePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Show loader for 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {isLoading ? (
        <Loader delay={5000} onFinish={() => setIsLoading(false)} /> // Show loader when loading
      ) : (
        <div>
          <Header />
          <h1>Game of Empires</h1>
          <MapGrid />
        </div>
      )}
    </div>
  );
};
