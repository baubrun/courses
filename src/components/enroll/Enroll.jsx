import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { createEnrollment, enrollmentState } from "../../redux/enrollmentSlice";
import { userState } from "../../redux/userSlice";
import { hideLoader,  showToaster } from "../../redux/layoutSlice";

import _ from "lodash"

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: "#ff3333",
    color: "white",
    cursor: "pointer",
    verticalAlign: "middle",
    padding: "10px",
  },
  form: {
    minWidth: 500,
  },
}));

const Enroll = (props) => {
  const classes = useStyles();
  const { error, enrollments, isLoading } = useSelector(enrollmentState);
  const { user } = useSelector(userState);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    enrollmentId: "",
    redirect: false,
  });

  const enrolledDisabled = () => {
    let notValid = false
    if (!user.name){
      notValid = true
    }
    const foundEnroll = enrollments.find(i => i.course._id === props.courseId)
    if (foundEnroll) {
      notValid = true
    }
    return notValid
  }

  useEffect(() => {
    if (error) dispatch({
      message: error,
      status: "error"
    })
  }, [error]);


  const handleEnroll = () => {
    dispatch(createEnrollment(props.courseId));
  };


  
  useEffect(() => {
    if (!isLoading) dispatch(hideLoader())
  }, [isLoading])

  if (values.redirect) {
    return <Redirect to={`/learn/${values.enrollmentId}`} />;
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleEnroll()}
        disabled={enrolledDisabled()}
      >
        Enroll
      </Button>

    </>
  );
};

export default Enroll;
