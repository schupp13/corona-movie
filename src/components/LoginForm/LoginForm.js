import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function LoginForm(props) {
  const classes = useStyles();

  return (
      <div className="">
    <Card >
      <CardContent >
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </form>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.onClick}>
          Register Now
        </Button>
        <Button variant="contained" color="primary" size="medium">
          Login
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}
