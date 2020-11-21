/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import DeleteUser from "./DeleteUser";

import { userState } from "../../redux/userSlice";
import { read } from "../../api/";
import { userPath } from "../../api/utils"

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const { loggedIn, user } = useSelector(userState);


  const authorized = async () => {
    const res = await read(userPath);
    const auth = res.user._id === user._id
    if (auth) {
      setAuth(auth);
    }
  };

  useEffect(() => {
    authorized();
  }, []);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {auth && loggedIn && (
            <ListItemSecondaryAction>
              <Link to={`/user/edit/${user._id}`}>
                <IconButton color="primary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteUser userId={user._id} />
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Profile;
