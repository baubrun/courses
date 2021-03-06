import React, { useState, useEffect, Suspense } from "react";
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
import {
  courseState,
  readCourse,
  clearError,
  updateCourse,
} from "../../redux/courseSlice";
import {
  enrollmentState,
  readEnrollmentStats,
  clearEnrollmentError,
} from "../../redux/enrollmentSlice";

import NewLesson from "./NewLesson";
import DeleteCourse from "./DeleteCourse";
import Enroll from "../enroll/Enroll";
import _ from "lodash";

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
    width: "50%"
  },
  enroll: {
    float: "right",
  },
  error: {
    backgroundColor: "#ff3333",
    color: "white",
    cursor: "pointer",
    verticalAlign: "middle",
    padding: "10px",
  },
  flex: {
    display: "flex",
    marginBottom: 20,
    marginBottom: 20,
  },
  icon: {
    verticalAlign: "sub",
  },
  media: {
    height: 300,
    width: 300,
    objectFit: "contain",
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
    display: "inline-block",
    margin: "3px 10px 5px 0px",
    fontSize: "0.9em",
  },
  subheading: {
    margin: "10px",
    color: theme.palette.openTitle,
  },
}));

const initCourseState = {
  published: false,
  name: "",
  image: "",
  instructor: {
    _id: "",
    name: "",
  },
  description: "",
  category: "",
  lessons: [],
};

const Course = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(userState);
  const { course, error } = useSelector(courseState);
  const { stats, statsError } = useSelector(enrollmentState);
  const [courseData, setCourseData] = useState({});
  const [statsData, setStatsData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState({
    errorMsg: "",
    redirect: false,
    statsErrorMsg: "",
  });


  const courseId = match.params.courseId

  useEffect(() => {
    dispatch(readCourse(courseId));
    dispatch(readEnrollmentStats(courseId))
  }, []);

  useEffect(() => {
    if (course) {
      setCourseData(course);
    }
    if (stats){
      setStatsData(stats);
    }
  }, [course, stats]);

  useEffect(() => {
    if (error) {
      setValues({ ...values, errorMsg: error, redirect: true });
    }
  }, [error]);

  useEffect(() => {
    if (statsError) {
      setValues({ ...values, statsErrorMsg: statsError , redirect: true});
    }
  }, [statsError]);


  const addLesson = (course) => {
    setCourseData(course);
  };

  const closeErrors = () => {
    setValues({ ...values, errorMsg: "" });
    dispatch(clearError());
    dispatch(clearEnrollmentError())
  };

  const handlePublish = () => {
    let pb = new FormData();
    pb.append("published", true);

    const data = {
      courseId: courseData._id,
      course: pb,
    };
    dispatch(updateCourse(data));
    if (!error) {
      setOpenDialog(false);
    } else {
      setValues({ ...values, errorMsg: error });
    }
  };

  const removeCourse = () => {
    setValues({ ...values, redirect: true });
  };

  if (values.redirect) {
    return <Redirect to={"/teach/courses"} />;
  }

  if (_.isEmpty(courseData)) return null;

  return (
    <Box className={classes.root}>
      <Card className={classes.card} elevation={4}>
        <CardHeader
          title={courseData.name}
          subheader={
            <Box>
              <Link
                to={`/user/${courseData.instructor._id}`}
                className={classes.sub}
              >
                By {courseData && courseData.instructor.name}
              </Link>
              <span className={classes.category}>{courseData.category}</span>
            </Box>
          }
          action={
            <>
              {authAPI.isAuthenticated() &&
                user._id == courseData.instructor._id && (
                  <span className={classes.action}>
                    <Link to={`/teach/course/edit/${courseData._id}`}>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </Link>
                    {!courseData.published ? (
                      <>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={
                            courseData.lessons && courseData.lessons.length > 0
                              ? () => setOpenDialog(true)
                              : null
                          }
                        >
                          {courseData.lessons && courseData.lessons.length === 0
                            ? "Add Lesson to publish course"
                            : "Publish"}
                        </Button>
                        <DeleteCourse
                          course={course}
                          removeCourse={removeCourse}
                        />
                      </>
                    ) : (
                      <Button color="primary" variant="outlined">
                        Published
                      </Button>
                    )}
                  </span>
                )}
              {courseData.published && (
                <Box>
                  <span className={classes.statSpan}>
                    <PeopleIcon />
                    {stats.totalEnrolled}
                  </span>
                  <span className={classes.statSpan}>
                    <CompletedIcon />
                    {stats.totalCompleted}
                  </span>
                </Box>
              )}
            </>
          }
        />

        <Box className={classes.flex}>
          <CardMedia
            className={classes.media}
            image={`${process.env.PUBLIC_URL}/images/${courseData.image}`}
            title={courseData.name}
          />
          <Box className={classes.details}>
            <Typography variant="body1" className={classes.subheading}>
              {courseData.description}
            </Typography>

            {courseData.published && (
              <Box className={classes.enroll}>
                <Enroll courseId={courseData._id} />
              </Box>
            )}
          </Box>
        </Box>

        {values.errorMsg && (
          <Box onClick={() => closeErrors()}>
            <Typography className={classes.error} component="div">
              {values.errorMsg}
            </Typography>
          </Box>
        )}
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
                {courseData.lessons && courseData.lessons.length} lessons
              </Typography>
            }
            action={
              authAPI.isAuthenticated() &&
              user._id === courseData.instructor._id &&
              !courseData.published && (
                <span className={classes.action}>
                  <NewLesson courseId={courseData._id} addLesson={addLesson} />
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
            {`Publish course "${courseData.name}" ?`}
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
            onClick={() => handlePublish()}
            variant="contained"
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Course;
