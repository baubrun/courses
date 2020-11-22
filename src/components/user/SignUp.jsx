import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import api from "../../api";
import {
  domain,
  signInPath,
  signOutPath,
  usersPath,
} from "../../api/utils"

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    error: "",
    name: "",
    open: false,
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const data = await api.create(user, usersPath)
    if (data && data.error) {
      setValues({ ...values, error: data.error });
    } else {
      setValues({ ...values, error: "", open: true });
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant="h6">
            Sign Up
          </Typography>
          <TextField
            className={classes.textField}
            id="name"
            label="Name"
            margin="normal"
            name="name"
            onChange={(evt) => handleChange(evt)}
            value={values.name}
          ></TextField>
          <br />
          <TextField
            className={classes.textField}
            id="email"
            label="Email"
            name="email"
            value={values.email}
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            type="email"
          />
          <br />
          <TextField
            className={classes.textField}
            id="password"
            label="Password"
            name="password"
            value={values.password}
            margin="normal"
            onChange={(evt) => handleChange(evt)}
            type="password"
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={(evt) => handleSubmit(evt)}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button autoFocus="autoFocus" color="primary" variant="contained">
              Sign in
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUp;
