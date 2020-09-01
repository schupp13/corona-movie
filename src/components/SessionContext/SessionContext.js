import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
export const SessionContext = createContext();

export const SessionProvider = (props) => {
  useEffect(() => {
    getSession();
  }, []);

  const [session, setSession] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  let [loggedIn, setLoggedIn] = useState(true);

  const getSession = () => {
    axios
      .get("api/session")
      .then((data) => {
        setSession(data.data);
        setLoggedIn(true);
        console.log(history);
        localStorage.setItem("user", JSON.stringify(data.data));
        history.location.pathname === "/" && history.push("/welcome");
      })
      .catch((error) => {
        setLoggedIn(false);
        history.push("/");
        console.log(error);
      });
  };

  const history = useHistory();

  const logoutSession = () => {
    axios
      .get("api/logout")
      .then((result) => {
        localStorage.removeItem("user");
        setSession({});
        setLoggedIn(false);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SessionContext.Provider
      value={[session, setSession, logoutSession, getSession, loggedIn]}
    >
      {props.children}
    </SessionContext.Provider>
  );
};
