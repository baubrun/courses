import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CompletedIcon from "@material-ui/icons/VerifiedUser";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Edit from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import PeopleIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import authAPI from "../../api/auth";
import { userState } from "../../redux/userSlice";
import { courseState, readCourse } from "../../redux/courseSlice";

import NewLesson from "./NewLesson"
import DeleteCourse from "./DeleteCourse"
import _ from "lodash"


const useStyles = makeStyles((theme) => ({
  action: {
    margin: "10px 0px",
    display: "flex",
    justifyContent: "flex-end",
  },
  category: {
    color: "#5c5c5c",
    fontSize: "8px",
    padding: "3px 5px",
    backgroundColor: "#dbdbdb",
    borderRadius: "2px",
    marginTop: 5,
  },
  card: {
    padding: "24px 40px 40px",
  },
  details: {
    margin: "16px",
  },
  enroll: {
    float: "right",
  },
  flex: {
    display: "flex",
    marginBottom: 20,
  },
  icon: {
    verticalAlign: "sub",
  },
  media: {
    height: 190,
    display: "inline-block",
    width: "100%",
    marginLeft: "16px",
  },
  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  statSpan: {
    margin: "7px 10px 0 10px",
    alignItems: "center",
    color: "#616161",
    display: "inline-flex",
    "& svg": {
      marginRight: 10,
      color: "#b6ab9a",
    },
  },
  sub: {
    display: "block",
    margin: "3px 0px 5px 0px",
    fontSize: "0.9em",
  },
  subheading: {
    margin: "10px",
    color: theme.palette.openTitle,
  },
}));

const Course = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector(userState);
  const {course} = useSelector(courseState);
  const [courseData, setCourseData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState({
    errorMsg: "",
    redirect: false,
  });



useEffect(() => {
   dispatch(readCourse( match.params.courseId))
}, [])

useEffect(() => {
  if (course){
    setCourseData(course)
  }
}, [course])


  const addLesson = (course) => {
    setCourseData(course);
  };

  const removeCourse = () => {
    setValues({...values, redirect: true})
  }


  if (_.isEmpty(course)) return null


  if (values.redirect) {
    return <Redirect to={"/teach/courses"} />;
  }


  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={course.name}
          subheader={
            <Box>
              <Link
                to={`/user/${course.instructor._id}`}
                className={classes.sub}
              >
                By {course.instructor.name}
              </Link>
              <span className={classes.category}>{course.category}</span>
            </Box>
          }
          action={
            <>
              { 
              authAPI.isAuthenticated()
              && user._id == course.instructor._id &&
              (
                <span className={classes.action}>
                  <Link to={`/teach/course/edit/${course._id}`}>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  {!course.published ? (
                    <>
                      <Button
                        color="secondary"
                        variant="contained"
                      >
                        {course.lesson && courseData.lessons.length === 0
                          ? "Add course"
                          : "Publish"}
                      </Button>
                      <DeleteCourse course={course} removeCourse={removeCourse}/>
                    </>
                  ) : (
                    <Button color="primary" variant="outlined">
                      Published
                    </Button>
                  )}
                </span>
              )}
              {course.published && (
                <Box>
                  <span className={classes.statSpan}>
                    <PeopleIcon />
                   enroll stats here
                  </span>
                  <span className={classes.statSpan}>
                    <CompletedIcon />
                   completed info here
                  </span>
                </Box>
              )}
            </>
          }
        />

        <Box className={classes.flex}>
          <CardMedia
            className={classes.media}
            image={`${process.env.PUBLIC_URL}/images/${course.image}`}
            title={course.name}
          />
          <Box className={classes.details}>
            <Typography variant="body1" className={classes.subheading}>
              {course.description}
            </Typography>

            {course.published && (
              <Box className={classes.enroll}>
                enroll here
              </Box>
            )}
          </Box>
        </Box>

        <Divider />
        <Box>
          <CardHeader
            title={
              <Typography variant="h6" className={classes.subheading}>
                Lessons
              </Typography>
            }
            subheader={
              <Typography variant="body1" className={classes.subheading}>
                {course.lessons && course.lessons.length} lessons
              </Typography>
            }
            action={
              loggedIn &&
              authAPI.isAuthenticated() &&
              !course.published && (
                <span className={classes.action}>
                  <NewLesson 
                  courseId={course._id} 
                  addLesson={addLesson} 
                  />
                </span>
              )
            }
          />
          <List>
            {courseData.lessons &&
              courseData.lessons.map((lesson, idx) => {
                return (
                  <span key={idx}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>{idx + 1}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={lesson.title} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </span>
                );
              })}
          </List>
        </Box>
      </Card>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Publish Course</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
           Publish msg here
          </Typography>
          <Typography variant="body1">
            note here
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => setOpenDialog(false)}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Course;
