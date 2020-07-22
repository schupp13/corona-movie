import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { HashRouter } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
    <HashRouter>
     <div className="App">

        {routes}
      </div>
    </HashRouter>
  );
}

export default App;
