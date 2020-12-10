import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { courseState, listCoursesPublished } from "../redux/courseSlice";
import Courses from "../components/course/Courses";

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
  const { courses, error } = useSelector(courseState);
  const [coursesData, setCoursesData] = useState([]);
  const [enrolledData, setEnrolledData] = useState([]);

  
  useEffect(() => {
    dispatch(listCoursesPublished());
  }, []);

  useEffect(() => {
    if (courses) {
      setCoursesData(courses);
    }
  }, [courses]);

    return (
      <>
        <Card className={classes.card}>
          <Typography variant="h5" component="h2">
            All Courses
          </Typography>
          {coursesData.length > 0 
          && coursesData.length 
          !== enrolledData.length 
          ? (
            <Courses courses={coursesData} />
          ) : (
            <Typography variant="body1" className={classes.noTitle}>
              No new courses.
            </Typography>
          )}
        </Card>
      </>
    );
 
};

export default Home;
