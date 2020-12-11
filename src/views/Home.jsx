import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { userState } from "../redux/userSlice";
import { courseState, listCoursesPublished } from "../redux/courseSlice";
import { enrollmentState, listEnrollments } from "../redux/enrollmentSlice";

import Courses from "../components/course/Courses";
import Enrollments from "../components/enroll/Enrollment"
import authAPI from "../api/auth"

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
  },
  media: {
    minHeight: 400,
  },

  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
    ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(userState);
  const { courses, error } = useSelector(courseState);
  const { enrollments } = useSelector(enrollmentState);
  const [coursesData, setCoursesData] = useState([]);
  const [enrolledData, setEnrolledData] = useState([]);


  useEffect(() => {
    dispatch(listEnrollments());
  }, []);


  useEffect(() => {
    dispatch(listCoursesPublished());
  }, []);


  useEffect(() => {
    if (courses) {
      setCoursesData(courses);
    }
  }, [courses]);


  useEffect(() => {
    if (enrollments) {
      setEnrolledData(enrollments);
    }
  }, [enrollments]);


  return (
    <div className={classes.extraTop}>
      {
      authAPI.isAuthenticated() && user._id  &&
      (
        <Card className={`${classes.card} ${classes.enrolledCard}`}>
          <Typography
            variant="h6"
            component="h2"
            className={classes.enrolledTitle}
          >
            Courses you are enrolled in
          </Typography>
          {enrolledData.length !== 0 ? (
            <Enrollments enrollments={enrolledData} />
          ) : (
            <Typography variant="body1" className={classes.noTitle}>
              No courses.
            </Typography>
          )}
        </Card>
      )}
      <Card className={classes.card}>
        <Typography variant="h5" component="h2">
          All Courses
        </Typography>
        {coursesData.length !== 0 && coursesData.length !== enrolledData.length ? (
          <Courses courses={coursesData} common={enrolledData} />
        ) : (
          <Typography variant="body1" className={classes.noTitle}>
            No new courses.
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default Home;
