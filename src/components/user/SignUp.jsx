import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { userState, createUser } from "../../redux/userSlice";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    backgroundColor: "#ff3333",
    color: "white",
    cursor: "pointer",
    verticalAlign: "middle",
    padding: "10px",
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
  const dispatch = useDispatch();
  const { error, loggedIn } = useSelector(userState);
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    errorMsg: "",
    name: "",
    open: false,
    password: "",
    redirect: false
  });

  useEffect(() => {
    if (loggedIn) {
      setValues({ ...values, redirect: true });
    }
  }, [loggedIn]);


  useEffect(() => {
    if (error) {
      setValues({ ...values, errorMsg: error });
    }
  }, [error]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const closeErrors = () => {
    setValues({ ...values, errorMsg: "" });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    dispatch(createUser(userData));
  };

  if (values.redirect) {
    <Redirect to="/" />
  }


  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Typography className={classes.title} variant="h6">
              Sign Up
            </Typography>
            {values.errorMsg && (
              <Box onClick={() => closeErrors()}>
                <Typography className={classes.error} component="p">
                  {values.errorMsg}
                </Typography>
              </Box>
            )}

            <TextField
              className={classes.textField}
              id="name"
              label="Name"
              margin="normal"
              name="name"
              onChange={(evt) => handleChange(evt)}
              value={values.name}
            ></TextField>
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
          </form>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            className={classes.submit}
            type="submit"
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
