import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

import { update } from "../../api";
import { userState, loadUser } from "../../redux/userSlice";
import {editPath} from "../../api/utils"

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
    verticalAlign: "middle",
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
  const { user } = useSelector(userState);
  const [values, setValues] = useState({
    instructor: false,
    error: "",
    email: "",
    name: "",
    password: "",
    redirect: false,
  });

  useEffect(() => {
    if (user) {
      setValues({
        ...values,
        instructor: user.instructor,
        email: user.email,
        name: user.name,
      });
    }
  }, [user]);

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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newData = {
      instructor: values.instructor,
      email: values.email,
      _id: user._id,
      name: values.name,
      password: values.password,
    };

    const data = await update(newData, user._id, editPath);
    if (data && data.error) {
      setValues({ ...values, error: data.error });
    } else {
      if (data && data.user) {
        setValues({
          ...values,
          redirect: true,
        });
        dispatch(
          loadUser({
            ...data.user
          })
        );
      }
    }
  };

  if (values.redirect) {
    return <Redirect to={`/user/${user._id}`} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="h6">
          Edit Profile
        </Typography>
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
        <br />
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
        <br />
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
        <br />
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
    </Card>
  );
};

export default EditProfile;
