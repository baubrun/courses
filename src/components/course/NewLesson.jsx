import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import api from "../../api/course";

const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: 500,
  },
}));

const NewLesson = (props) => {
  const classes = useStyles();
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const lesson = {
      title: values.title,
      content: values.content,
      resource_url: values.resource_url,
    };

    const data = await api.createNewLesson(lesson, props.courseId);
    if (data) {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        props.addLesson(data);
        setValues({
          ...values,
          content: "",
          resource_url: "",
          title: "",
        });
        setOpenDialog(false);
      }
    }
  };

  return (
    <div>
      <Button
        aria-label="Add Lesson"
        color="primary"
        onClick={() => setOpenDialog()}
        variant="contained"
      >
        <Add /> &nbsp; New Lesson
      </Button>
      <Dialog
        aria-labelledby="form-dialog-title"
        open={() => setOpenDialog(true)}
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
              onClick={(evt) => handleSubmit(evt)}
              color="primary"
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default NewLesson;
