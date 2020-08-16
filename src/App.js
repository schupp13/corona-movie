import React from "react";
import "./App.scss";
import { HashRouter } from "react-router-dom";
import routes from "./routes/routes";
import Navbar from "./components/Sections/NavBar/NavBar";
import Footer from "./components/Sections/Footer/Footer";
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
