import React, { useEffect, useState } from "react";
import "./style.css";

export const Loader = ({ delay = 5000, onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onFinish]);

  if (!isVisible) return null;

  return (
    <div className="loader-container">
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading your adventure...</p>
      </div>
    </div>
  );
};
