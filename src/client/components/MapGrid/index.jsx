import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const GRID_SIZE = 10;

export const MapGrid = () => {
  const [adventures, setAdventures] = useState([]);
  const [selectedAdventure, setSelectedAdventure] = useState(null);

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const { data } = await axios.get("/api/adventures");
        setAdventures(data);
      } catch (error) {
        console.error("Error fetching adventures:", error);
      }
    };

    fetchAdventures();
  }, []);

  const handleAdventureClick = (adventure) => {
    setSelectedAdventure(adventure);
  };

  const generateRandomPosition = () => {
    const x = Math.floor(Math.random() * GRID_SIZE) + 1;
    const y = Math.floor(Math.random() * GRID_SIZE) + 1;
    return { x, y };
  };

  return (
    <div className="map-grid">
      {adventures.map((adventure, index) => {
        const position = generateRandomPosition();
        return (
          <div
            key={index}
            className="map-grid-item"
            style={{
              gridColumn: position.x,
              gridRow: position.y,
            }}
            onClick={() => handleAdventureClick(adventure)}
          >
            <img
              src={`/assets/images/adventures/${adventure.name}.jpg`}
              alt={adventure.name}
              className="adventure-marker"
            />
          </div>
        );
      })}
      {selectedAdventure && (
        <div className="adventure-details">
          <h2>{selectedAdventure.name}</h2>
          <p>{selectedAdventure.description}</p>
          <p>Difficulty: {selectedAdventure.difficulty}</p>
          <p>Time Required: {selectedAdventure.timeRequired} minutes</p>
          <p>Resource Cost: {JSON.stringify(selectedAdventure.resourceCost)}</p>
          <p>Rewards: {JSON.stringify(selectedAdventure.rewards)}</p>
          <button onClick={() => setSelectedAdventure(null)}>Close</button>
        </div>
      )}
    </div>
  );
};
