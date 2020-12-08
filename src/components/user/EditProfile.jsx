import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

import { userState, updateUser, clearError } from "../../redux/userSlice";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    backgroundColor: "#ff3333",
    color: "white",
    cursor: "pointer",
    verticalAlign: "middle",
    padding: "10px",
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

const EditProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, error } = useSelector(userState);
  const [values, setValues] = useState({
    instructor: false,
    errorMsg: "",
    email: "",
    name: "",
    password: "",
    redirect: false,
  });

  useEffect(() => {
    if (error) {
      setValues({ ...values, errorMsg: error });
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      setValues({
        ...values,
        instructor: user.instructor,
        email: user.email,
        name: user.name,
      });
    }
  }, [user, values]);

  const closeErrors = () => {
    setValues({ ...values, errorMsg: "" });
    dispatch(clearError())
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSwitch = (evt) => {
    const { checked } = evt.target;
    setValues({
      ...values,
      instructor: checked,
    });
  };

 
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const newData = {
      instructor: values.instructor,
      email: values.email,
      _id: user._id,
      name: values.name,
      password: values.password,
    };

    dispatch(updateUser(newData))
  }


  if (values.redirect) {
    return <Redirect to={`/user/${user._id}`} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <form onSubmit={handleSubmit}>
        <Typography className={classes.title} variant="h6">
          Edit Profile
        </Typography>

        {values.errorMsg && (
               <Box 
               onClick={() => closeErrors()}
               >
                 <Typography className={classes.error} component="p">
                   {values.errorMsg}
                 </Typography>
               </Box>
          )}

        <TextField
          className={classes.textField}
          id="email"
          label="Email"
          name="email"
          margin="normal"
          onChange={(evt) => handleChange(evt)}
          type="email"
          value={values.email || ""}
        ></TextField>
        <TextField
          className={classes.textField}
          id="name"
          label="Name"
          name="name"
          margin="normal"
          onChange={(evt) => handleChange(evt)}
          type="name"
          value={values.name || ""}
        />
        <TextField
          className={classes.textField}
          id="password"
          label="Password"
          name="password"
          margin="normal"
          onChange={(evt) => handleChange(evt)}
          type="password"
          value={values.password || ""}
        />

        <Typography variant="subtitle1" className={classes.subheading}>
          I am an instructor.
        </Typography>
        <FormControlLabel
          control={
            <Switch
              classes={{
                checked: classes.checked,
                bar: classes.bar,
              }}
              checked={values.instructor}
              onChange={(evt) => handleSwitch(evt)}
            />
          }
          label={values.instructor ? "Yes" : "No"}
        />
        </form>
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
    </Card>
  );
};

export default EditProfile;
