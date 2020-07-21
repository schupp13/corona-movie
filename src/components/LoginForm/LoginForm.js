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
  button:{
    background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(1,180,228,1) 35%, rgba(144,206,161,1) 100%)',

  }
}));

export default function LoginForm(props) {
  const classes = useStyles();

  return (
    <Card >
      <CardContent >
        <form className={classes.root} noValidate autoComplete="off">
            <h2 className="login-heading">Login</h2>
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <Button className={classes.button} variant="contained" color="primary" size="medium">
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
