import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Redirect, Link } from "react-router-dom";

import { userState } from "../../redux/userSlice";
import { courseState, listCourseByInstructor } from "../../redux/courseSlice";


const useStyles = makeStyles((theme) => ({
  addButton: {
    float: "right",
  },
  avatar: {
    borderRadius: 0,
    width: 65,
    height: 40,
  },
  leftIcon: {
    marginRight: "8px",
  },
  listText: {
    marginLeft: 16,
  },
  link: {
    color: "#1b0000 !important",
    textDecoration: "none",
  },
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "32px",
  },
}));

const MyCourses = () => {
  const classes = useStyles();
  const dispatch = useDispatch(listCourseByInstructor);
  const { courses } = useSelector(courseState);
  const { user } = useSelector(userState);
  const [values, setValues] = useState({
    myCourses: [],
    redirect: false,
  });

  useEffect(() => {
    dispatch(listCourseByInstructor(user._id));
  }, []);

  useEffect(() => {
    if (courses){
      setValues({...values, myCourses: courses})
    }
  }, [courses]);



  if (values.redirect) {
    return <Redirect to="/signin" />;
  }


  return (
    <>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Courses
          <span className={classes.addButton}>
            <Link className={classes.link} to="/teach/course/new">
              <Button color="primary" variant="contained">
                <Icon className={classes.leftIcon}>add_box</Icon> New Course
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
          {
            values.myCourses?.map((course, idx) => {
              return (
                <Link
                  className={classes.link}
                  to={`/teach/course/${course._id}`}
                  key={idx}
                >
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar
                        src={`${process.env.PUBLIC_URL}/images/${course.image}`}
                        className={classes.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={course.name}
                      secondary={course.description}
                      className={classes.listText}
                    />
                  </ListItem>
                  <Divider />
                </Link>
              );
            })}
        </List>
      </Paper>
    </>
  );
};

export default MyCourses;
