import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import './LoginForm.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      flexDirection: "column",
      
    margin: theme.spacing(1),
    width: "350px",
    },
  },
}));

export default function RegisterForm(props) {
  const classes = useStyles();

  return (
    
    <Card>
      <CardContent>
        <form className={classes.root} noValidate autoComplete="off">
        <h2 className="login-heading">Register</h2>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Last Name" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
          />
          <Button variant="contained" color="primary" size="medium">
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
