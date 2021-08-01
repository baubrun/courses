import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { signIn, userState } from "../../redux/userSlice";
import { hideLoader,  showLoader,  showToaster } from "../../redux/layoutSlice";

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
  signUp: {
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      fontSize: "16px",
    },
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loggedIn, error, isLoading } = useSelector(userState);
  const [values, setValues] = useState({
    created: "",
    email: "",
    name: "",
    password: "",
    redirect: false,
  });

  useEffect(() => {
    if (loggedIn) {
      setValues({
        ...values,
        redirect: true,
      });
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   if (!isLoading) dispatch(hideLoader())
  // }, [isLoading])


  useEffect(() => {
    if (error) {
      dispatch(showToaster({
        status: "error",
        message: error
      }))
    }
  }, [error]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const userData = {
      email: values.email,
      password: values.password,
    };
    dispatch(showLoader())
    dispatch(signIn(userData))
    dispatch(hideLoader())
  };

  if (values.redirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography className={classes.title} variant="h6">
              Sign In
            </Typography>
            <TextField
              className={classes.textField}
              id="email"
              label="Email"
              name="email"
              margin="normal"
              onChange={(evt) => handleChange(evt)}
              type="email"
              value={values.email}
            ></TextField>
            <TextField
              className={classes.textField}
              id="password"
              label="Password"
              name="password"
              margin="normal"
              onChange={(evt) => handleChange(evt)}
              type="password"
              value={values.password}
            />

      
          </CardContent>
          <CardActions>
            <Button
              className={classes.submit}
              color="primary"
              variant="contained"
              type="submit"
            >
              submit
            </Button>
          </CardActions>
          <br />

          <Typography variant="body2" component="p">
            Not registered? &nbsp;
            <span>
              <Link className={classes.signUp} to="/signUp">
                Sign Up
              </Link>
            </span>
          </Typography>
        </form>
      </Card>
    </>
  );
};

export default SignIn;
