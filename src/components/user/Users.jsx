import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
import ArrowForward from "@material-ui/icons/ArrowForward";
import Person from "@material-ui/icons/Person";
import Box from "@material-ui/core/Box";

import {list}  from "../../api";

import {
  usersPath,
} from "../../api/utils"



const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
}));


const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("")

  const getUsers = async () => {
    const data = await list(usersPath)
    if (data && data.error){
      setError(data.error)
    } else {
      setUsers(data);
    }
  }


  useEffect(() => {
    getUsers()
  }, [])

  if (error) {
    return <Box>{error}</Box>
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.map((user, idx) => {
          return (
            <Link to={"/user/" + user._id} key={idx}>
              <ListItem button>
                  
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary={user.name} />

                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
};

export default Users;
