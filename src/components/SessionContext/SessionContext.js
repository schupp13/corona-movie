import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
export const SessionContext = createContext();

export const SessionProvider = (props) => {
  // useEffect(() => {
  //   getSession();
  // }, []);
  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const getSession = () => {
    axios
      .get("api/session")
      .then((data) => setSession(data.data))
      .catch((error) => console.log(error));
  };

  const history = useHistory();

  const logoutSession = () => {
    axios
      .get("api/logout")
      .then((result) => {
        localStorage.removeItem("user");
        setSession({});
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SessionContext.Provider value={[session, setSession, logoutSession]}>
      {props.children}
    </SessionContext.Provider>
  );
};
