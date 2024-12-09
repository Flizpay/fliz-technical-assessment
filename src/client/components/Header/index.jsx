import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/index";

import "./styles.css";

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

const getHouseFlag = (houseName) => {
  const house = HOUSE_FLAGS.find(({ house }) => house === houseName);
  return house ? house.flag : null;
};

export const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  if (!user) return null;

  const houseFlag = getHouseFlag(user.house);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleResourcesToggle = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };

  const handleSkillsToggle = () => {
    setIsSkillsOpen(!isSkillsOpen);
  };

  return (
    <header className="header">
      <div className="userInfo">
        {houseFlag && (
          <img
            src={houseFlag}
            alt={`${user.house} flag`}
            className="userAvatar"
          />
        )}
        <div className="userDetails">
          {user.name} <span>of house</span> {user.house}
        </div>
      </div>
      <div className="userInfo-Container">
        <button className="toggle-button" onClick={handleResourcesToggle}>
          {isResourcesOpen ? "Hide Resources" : "Show Resources"}
        </button>
        {isResourcesOpen && (
          <div className="toggle-content">
            <div className="resources">
              <h3>Resources</h3>
              <p>Coins: {user.resources.coins}</p>
              <p>Peasants: {user.resources.peasants}</p>
              <p>Scrolls: {user.resources.scrolls}</p>
            </div>
          </div>
        )}

        <button className="toggleButton" onClick={handleSkillsToggle}>
          {isSkillsOpen ? "Hide Skills" : "Show Skills"}
        </button>
        {isSkillsOpen && (
          <div className="toggleContent">
            <div className="skills">
              <h3>Skills</h3>
              <p>Fear: {user.skills.fear}</p>
              <p>Magic: {user.skills.magic}</p>
              <p>Trading: {user.skills.trading}</p>
              <p>Wisdom: {user.skills.wisdom}</p>
            </div>
          </div>
        )}

        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};
