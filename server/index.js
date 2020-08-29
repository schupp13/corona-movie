require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const bodyParser = require("body-parser");
const AC = require("./controllers/auth_controller");

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

app.post("/api/login", AC.login);
app.get("/api/session", AC.getSession);
// app.get("/api/logout", AC.logout);

app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT}`));
