import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import courseAPI from "../../api/course";
import { clearError, courseState } from "../../redux/courseSlice";
import { hideLoader, showLoader, showToaster } from "../../redux/layoutSlice";
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

const NewLesson = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error } = useSelector(courseState);
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState({
    content: "",
    resource_url: "",
    title: "",
  });

  useEffect(() => {
    if (error) {
       dispatch(showToaster({
            message: error,
            status: "error"
          }))
    }
    return () => {
      if (error) dispatch(clearError())
    }
  }, [error]);


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const lesson = {
      title: values.title,
      content: values.content,
      resource_url: values.resource_url,
    };

  //   const data = await courseAPI.createNewLesson(lesson, props.courseId);
  //   if (data) {
  //     if (data.error){
  //       setValues({ ...values, errorMsg: data.error });
  //     }
  //    else {
  //     props.addLesson(data.course);
  //     setValues({
  //       ...values,
  //       title: "",
  //       content: "",
  //       resource_url: "",
  //     });
  //     setOpenDialog(false)
  //    }
  // }

    try {
      dispatch(showLoader())
      const data = await courseAPI.createNewLesson(lesson, props.courseId);
      props.addLesson(data.course);
      setValues({
        ...values,
        title: "",
        content: "",
        resource_url: "",
      });
      setOpenDialog(false)
    } catch (err) {
      const errMsg = err.response ? err.response.data : err.message;
      dispatch(showToaster({
        message: errMsg,
        status: "error"
      }))
    } finally {
      dispatch(hideLoader())
    }
}

  return (
    <>
      <Button
        aria-label="Add Lesson"
        color="primary"
        onClick={() => setOpenDialog(true)}
        variant="contained"
      >
        <Add /> &nbsp; New Lesson
      </Button>
      <Dialog
        aria-labelledby="form-dialog-title"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <form className={classes.form} onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add New Lesson</DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Title"
              name="title"
              type="text"
              value={values.title}
              onChange={(evt) => handleChange(evt)}
            />
            <TextField
              fullWidth
              label="Content"
              margin="dense"
              multiline
              name="content"
              onChange={(evt) => handleChange(evt)}
              rows="5"
              type="text"
              value={values.content}
            />
            <TextField
              fullWidth
              label="Resource link"
              margin="dense"
              name="resource_url"
              onChange={(evt) => handleChange(evt)}
              type="text"
              value={values.resource_url}
            />
          </DialogContent>
          
          <DialogActions>
            <Button
              onClick={() => setOpenDialog(false)}
              color="default"
              variant="contained"
            >
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default NewLesson;
