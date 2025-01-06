import React, { useState } from "react";

export const HouseOfThrones = ({ selectedHouse, setSelectedHouse }) => {
  const [isRequired, setIsRequired] = useState(false);

  const handleHouseChange = (event) => {
    setSelectedHouse(event.target.value);
    setIsRequired(event.target.value === "");
  };

  const houses = [
    "Stark",
    "Lannister",
    "Baratheon",
    "Targaryen",
    "Greyjoy",
    "Tully",
    "Arryn",
    "Martell",
    "Tyrell",
  ];

  return (
    <div>
      <select value={selectedHouse} onChange={handleHouseChange}>
        <option value="">Choose a House</option>
        {houses.map((house) => (
          <option key={house} value={house}>
            {house}
          </option>
        ))}
      </select>
      {isRequired && <p style={{ color: "red" }}>Please select a house.</p>}
    </div>
  );
};
