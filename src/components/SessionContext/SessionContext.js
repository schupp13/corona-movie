import React, { useEffect, createContext, useState } from "react";
import axios from "axios";

export const SessionContext = createContext();
export const SessionProvider = (props) => {
  const [session, setSession] = useState({});
  useEffect(() => {
    wait();
  }, []);

  const wait = async () => {
    const newText = await getSession();
    setSession(newText);
  };
  const getSession = () => {
    axios
      .get("/api/session")
      .then((data) => {
        console.log(data.data);
        return data.data;
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <SessionContext.Provider value={[session, setSession]}>
      {props.children}
    </SessionContext.Provider>
  );
};
