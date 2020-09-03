import React from "react";
import "./App.scss";
import { HashRouter } from "react-router-dom";
import routes from "./routes/routes";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { SessionProvider } from "./components/SessionContext/SessionContext";
const theme = createMuiTheme({
  button: {
    spacing: "40px",
    color: "yellow",
    fontSize: "30px",
  },
  palette: {
    primary: {
      main: "#0d253f",
    },
    secondary: {
      main: "#0d253f",
    },
  },
});
function App() {
  return (
    <HashRouter>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <div className="App">{routes}</div>
        </ThemeProvider>
      </SessionProvider>
    </HashRouter>
  );
}

export default App;
