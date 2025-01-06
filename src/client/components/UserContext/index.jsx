import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Loader } from "../index";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/profile")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader delay={5000} onFinish={() => setLoading(false)} />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
