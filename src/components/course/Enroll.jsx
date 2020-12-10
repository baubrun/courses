import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { createEnrollment, enrollmentState, clearError } from "../../redux/enrollmentSlice";

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
  const { error } = useSelector(enrollmentState);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    enrollmentId: "",
    errorMsg: "",
    redirect: false,
  });

  const closeErrors = () => {
    setValues({ ...values, errorMsg: "" });
    dispatch(clearError());
  };

  useEffect(() => {
    if (error) {
      setValues({ ...values, errorMsg: error });
    }
  }, [error]);

  const handleEnroll = () => {
    dispatch(createEnrollment(props.course._id));
    if (!error) {
      setValues({ ...values, redirect: true });
    }
  };

  if (values.redirect) {
    return <Redirect to={`/learn/${values.enrollmentId}`} />;
  }

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleEnroll()}
      >
        Enroll
      </Button>

      {values.errorMsg && (
        <Box onClick={() => closeErrors()}>
          <Typography className={classes.error} component="p">
            {values.errorMsg}
          </Typography>
          <Box className={classes.close}>X</Box>
        </Box>
      )}
    </>
  );
};

export default Enroll;
