import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { SessionContext } from "../../SessionContext/SessionContext";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import axios from "axios";

import InputField from "../InputField/InputField";
import "./LoginForm.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(1),
      width: "350px",
    },
  },
  button: {
    background:
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(1,180,228,1) 35%, rgba(144,206,161,1) 100%)",
  },
}));

export default function LoginForm(props) {
  let [session, setSession, setLoggedIn, getSession] = useContext(
    SessionContext
  );
  const classes = useStyles();
  const history = useHistory();
  let [username, setUsername] = useState("guest");
  let [password, setPassword] = useState("password");
  let [errors, setErrors] = useState(``);
  let [errorObejct, setErrorObject] = useState("");
  const handleChangeUsername = (e) => {
    setUsername(e.currentTarget.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", { username, password })
      .then((results) => {
        console.log(results);
        getSession();
      })
      .catch((error) => {
        console.log(error);
        setErrors("Username or Email is not correct");
        setErrorObject(error.response);
        console.log(errorObejct);
        props.errorLogin();
      });
  };

  let errorsjsx = errors ? <p style={{ color: "red" }}>{errors}</p> : "";
  return (
    <Card className={errors && "alert"}>
      <CardContent>
        <form
          onSubmit={submitLogin}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <h2 className="login-heading">Login</h2>
          {errorsjsx}
          {/* <TextField
            autoFocus
            value={username}
            name="username"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={handleChangeUsername}
          /> */}
          <InputField
            name="username"
            value={username}
            label="Username"
            onChange={handleChangeUsername}
            type=""
          ></InputField>
          <InputField
            name="password"
            value={password}
            label="Password"
            onChange={handleChangePassword}
            type="password"
          ></InputField>

          <Button
            className={classes.button}
            variant="contained"
            size="medium"
            type="submit"
          >
            Continue
          </Button>
        </form>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.onClick}>
          Register Now
        </Button>
      </CardActions>
    </Card>
  );
}
