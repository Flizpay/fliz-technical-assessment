import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/index";

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
    gap: "10px",
  },
  userAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  logoutButton: {
    marginLeft: "20px",
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  resources: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
  },
  skills: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
  },
};

export const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return null;

  const houseFlag = getHouseFlag(user.house);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

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
        <button style={HeaderStyles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="resources" style={HeaderStyles.resources}>
        <h3>Resources</h3>
        <p>Coins: {user.resources.coins}</p>
        <p>Peasants: {user.resources.peasants}</p>
        <p>Scrolls: {user.resources.scrolls}</p>
      </div>
      <div className="skills" style={HeaderStyles.skills}>
        <h3>Skills</h3>
        <p>Fear: {user.skills.fear}</p>
        <p>Magic: {user.skills.magic}</p>
        <p>Trading: {user.skills.trading}</p>
        <p>Wisdom: {user.skills.wisdom}</p>
      </div>
    </header>
  );
};
