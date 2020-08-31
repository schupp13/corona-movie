import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const SessionContext = createContext();

export const SessionProvider = (props) => {
  useEffect(() => {
    getSession();
  }, []);
  const [session, setSession] = useState({});
  const getSession = () => {
    axios
      .get("api/session")
      .then((data) => setSession(data.data))
      .catch((error) => console.log(error));
  };
  return (
    <SessionContext.Provider value={[session, setSession]}>
      {props.children}
    </SessionContext.Provider>
  );
};
