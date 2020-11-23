import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import api from "../../api/user";
import { setToken } from "../../api/auth";
import { signInAction } from "../../redux/userSlice";


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
  const [values, setValues] = useState({
    created: "",
    email: "",
    error: "",
    name: "",
    password: "",
    redirect: false,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    const user = {
      email: values.email,
      password: values.password,
    }

    const data = await api.signIn(user);
    if (data) {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setToken(data.token, () => {
          dispatch(
            signInAction({
              ...data.user,
            })
          );
          setValues({ redirect: true });
        });
      }
    }
  };

  const from = props.location.state || "/";

  const { redirect } = values;
  if (redirect) {
    return <Redirect to={from} />;
  }

  return (
    <>
      <form>
        <Card className={classes.card}>
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
            <br />
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
            {values.error && (
              <Typography color="error" component="p">
                <Icon className={classes.error} color="error">
                  error
                </Icon>
                {values.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              className={classes.submit}
              color="primary"
              onClick={(evt) => handleSubmit(evt)}
              variant="contained"
            >
              submit
            </Button>
          </CardActions>
          <br />

          <Typography variant="body2" component="p">
            Not registered? &nbsp;
            <span>
              <Link className={classes.signUp} to="/SignUp">
                Sign Up
              </Link>
            </span>
          </Typography>
        </Card>
      </form>
    </>
  );
};

export default SignIn;

