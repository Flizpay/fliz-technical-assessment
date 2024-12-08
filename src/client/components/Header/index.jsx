import React, { useContext } from "react";
import { UserContext } from "../../components/index";

// Constants for house flags
const HOUSE_FLAGS = [
  {
    house: "Stark",
    flag: require("../../../assets/images/house-flags/house_stark.jpg"),
  },
  {
    house: "Lannister",
    flag: require("../../../assets/images/house-flags/house_lannister.jpg"),
  },
  {
    house: "Targaryen",
    flag: require("../../../assets/images/house-flags/house_targaryen.jpg"),
  },
  {
    house: "Baratheon",
    flag: require("../../../assets/images/house-flags/house_baratheon.jpg"),
  },
  {
    house: "Greyjoy",
    flag: require("../../../assets/images/house-flags/house_greyjoy.jpg"),
  },
  {
    house: "Martell",
    flag: require("../../../assets/images/house-flags/house_martell.jpg"),
  },
  {
    house: "Tyrell",
    flag: require("../../../assets/images/house-flags/house_tyrell.jpg"),
  },
  {
    house: "Arryn",
    flag: require("../../../assets/images/house-flags/house_arryn.jpg"),
  },
  {
    house: "Tully",
    flag: require("../../../assets/images/house-flags/house_tully.jpg"),
  },
];

/**
 * Finds and returns the flag for a given house.
 * @param {string} houseName - The name of the house to find the flag for.
 * @returns {string | null} The URL of the house flag or null if not found.
 */
const getHouseFlag = (houseName) => {
  const house = HOUSE_FLAGS.find(({ house }) => house === houseName);
  return house ? house.flag : null;
};

// Styles for the Header component
const HeaderStyles = {
  container: {
    textAlign: "center",
    padding: "50px",
    border: "1px solid grey",
    borderRadius: "16px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px", // Slightly increased for better spacing
  },
  userAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
};

export const Header = () => {
  const { user } = useContext(UserContext);

  if (!user) return null; // Early return for better readability and avoiding nested conditions

  const houseFlag = getHouseFlag(user.house);

  return (
    <header className="header" style={HeaderStyles.container}>
      <div className="user-info" style={HeaderStyles.userInfo}>
        {houseFlag && (
          <img
            src={houseFlag}
            alt={`${user.house} flag`}
            style={HeaderStyles.userAvatar}
          />
        )}
        <div>
          {user.name} <span>of house</span> {user.house}
        </div>
      </div>
    </header>
  );
};
