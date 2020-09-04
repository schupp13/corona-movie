require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const bodyParser = require("body-parser");
const AC = require("./controllers/auth_controller");
const MC = require("./controllers/movie_controller");
const TVC = require("./controllers/tv_controller");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// massive(CONNECTION_STRING).then((db) => {
//   app.set("db", db);
//   console.log("db is connected");
// });
massive(CONNECTION_STRING).then((db) => {
  app.set("db", db);
});

// Tvshow controller enpoints
app.post("/api/tvshow/user/state", TVC.getUserState);

app.post("/api/tvshow/createFavorite", TVC.createFavorite);
app.post("/api/tvshow/checkFavorite", TVC.getFavorite);
app.post("/api/tvshow/createWatchList", TVC.createWatchList);
app.post("/api/tvshow/checkWatchList", TVC.getWatchList);

// movie Controller endpoints
app.post("/api/movie/user/state", MC.getUserState);
app.post("/api/movie/createFavorite", MC.createFavorite);
app.post("/api/movie/checkFavorite", MC.getFavorite);
app.post("/api/movie/createWatchList", MC.createWatchList);
app.post("/api/movie/checkWatchList", MC.getWatchList);

// Auth COntroller endpoints

app.post("/api/login", AC.login);
app.post("/api/register", AC.register);
app.get("/api/session", AC.getSession);
app.get("/api/logout", AC.logout);

app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT}`));
