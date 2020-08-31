import React from "react";
import "./App.scss";
import { HashRouter } from "react-router-dom";
import routes from "./routes/routes";
import { SessionProvider } from "./components/SessionContext/SessionContext";

function App() {
  return (
    <HashRouter>
      <SessionProvider>
        <div className="App">{routes}</div>
      </SessionProvider>
    </HashRouter>
  );
}

export default App;
