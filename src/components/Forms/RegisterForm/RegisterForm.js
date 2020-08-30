import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import InputField from "../../Forms/InputField/InputField";
import "./RegisterForm.scss";
import axios from "axios";
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

export default function RegisterForm(props) {
  const history = useHistory();
  const submitRegister = (e) => {
    e.preventDefault();
    axios
      .post("/api/register", { username, password, email })
      .then((result) => {
        console.log(result.data);
        localStorage.setItem("user", JSON.stringify(result.data));
        history.push("/welcome");
      })
      .catch((error) => {
        console.log(error);
        setErrors("Username or Email is not correct");
        props.errorLogin();
      });
  };
  const classes = useStyles();
  let [errors, setErrors] = useState("");
  let [email, setEmail] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  return (
    <Card>
      <CardContent>
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={submitRegister}
        >
          <h2 className="login-heading">Register</h2>
          <InputField
            name="email"
            value={email}
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
          ></InputField>
          <InputField
            name="username"
            value={username}
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            type=""
          ></InputField>
          <InputField
            name="password"
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          ></InputField>
          <InputField
            name="Confirm Password"
            value={confirmPassword}
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          ></InputField>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="medium"
            type="submit"
            disabled={
              password !== confirmPassword || !password || !email || !username
            }
          >
            Continue
          </Button>
        </form>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.onClick}>
          Login Now
        </Button>
      </CardActions>
    </Card>
  );
}
