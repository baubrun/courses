import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { readUser, userState } from "../../redux/userSlice";


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
  const { user, error } = useSelector(userState);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    created: "",
    email: "",
    errorMsg: "",
    name: "",
    password: "",
    redirect: false,
  });

  useEffect(() => {
    if (user) {
      setValues({
        ...values,
        redirect: true
      });
    }
  }, [user, values]);


  useEffect(() => {
    if (error) {
      setValues({ ...values, errorMsg: error });
    }
  }, [error]);

  const closeErrors = () => {
    setValues({ ...values, errorMsg: "" });
  };



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
    }

    dispatch(readUser(userData))
  };



  if (values.redirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      
        <Card className={classes.card}>
          <CardContent>
          <form onSubmit={handleSubmit}>
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
            </form>

        {values.errorMsg && (
               <Box 
               onClick={() => closeErrors()}
               >
                 <Typography className={classes.error} component="p">
                   {values.errorMsg}
                 </Typography>
               </Box>
          )}
          </CardContent>
          <CardActions>
            <Button
              className={classes.submit}
              color="primary"
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
    </>
  );
};

export default SignIn;

