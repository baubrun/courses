/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";
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

import api from "../../api/user";
import {isAuthorized} from "../../api/auth";

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

const Profile = ({ match }) => {
  const classes = useStyles();
  // const [auth, setAuth] = useState(false);
  const { loggedIn, user } = useSelector(userState);
  const [profile, setProfile] = useState({});
  const [redirect, setRedirect] = useState(false);

  const profileId = match.params.userId;
  const auth = profileId === user._id;

  const getUser = async (id) => {
    const data = await api.read(id);
    if (data) {
      if (data.error) {
        setRedirect(true);
      }
      setProfile(data);
    }
  };

  useEffect(() => {
    getUser(profileId);
  }, []);

  if (redirect) {
    return <Redirect to="/signin" />;
  }

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
          <ListItemText primary={profile.name} secondary={profile.email} />
          {/* {loggedIn && isAuthorized(profileId, user._id) && ( */}
          {loggedIn && auth && (
            <ListItemSecondaryAction>
              <Link to={`/user/edit/${profileId}`}>
                <IconButton color="primary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteUser userId={profile._id} />
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(profile.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Profile;
