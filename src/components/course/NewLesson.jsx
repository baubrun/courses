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

import { createNewLesson } from "../../redux/courseSlice";


const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: 500,
  },
}));

const NewLesson = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState({
    error: "",
    content: "",
    resource_url: "",
    title: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const lesson = {
      title: values.title,
      content: values.content,
      resource_url: values.resource_url,
    };

    const data = {
      lesson,
      id: props.courseId
    }

    dispatch(createNewLesson(data))

  };

  return (
    <form onSubmit={handleSubmit}>
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
        <div className={classes.form}>
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
            <br />
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
            <br />
            <TextField
              fullWidth
              label="Resource link"
              margin="dense"
              name="resource_url"
              onChange={(evt) => handleChange(evt)}
              type="text"
              value={values.resource_url}
            />
            <br />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => setOpenDialog(false)}
              color="default"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >
              Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </form>
  );
};

export default NewLesson;
