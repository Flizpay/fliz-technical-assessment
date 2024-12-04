import React, { useContext } from "react";
import { UserContext } from "../../components/index";

export const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header
      className="header"
      style={{
        textAlign: "center",
        padding: "50px",
        border: "1px solid grey",
        borderRadius: "16px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <div
        className="user-info"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        {!!user && (
          <div>
            {user.name} <span> of house </span> {user.house}
          </div>
        )}
      </div>
    </header>
  );
};
