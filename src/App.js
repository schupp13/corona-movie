import React from "react";
import "./App.scss";
import { HashRouter } from "react-router-dom";
import routes from "./routes/routes";
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <HashRouter>
     <div className="App">
        <Navbar />
        {routes}
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
