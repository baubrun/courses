import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import courseAPI from "../../api/course";
import { courseState, setError } from "../../redux/courseSlice";

const DeleteCourse = (props) => {
  const dispatch = useDispatch()
  const { error } = useSelector(courseState);
  const [open, setOpen] = useState(false);


  const delCourse = async () => {
    const data = await courseAPI.removeCourse(props.course._id);
    if (data && data.error) {
      dispatch(setError(data.error));
    } else {
      setOpen(false);
      props.onRemove();
    }
  };

  const handleDelete = () => {
    delCourse();
  };

  return (
    <span>
      <IconButton
        aria-label="Delete"
        onClick={() => setOpen(true)}
        color="secondary"
      >
        <DeleteIcon color="error" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{error ? error : `Delete ${props.course.name}`}</DialogTitle>
        <DialogContent>
         
          <DialogContentText>
          {error ? error : `Confirm to delete course "${props.course.name}"`}
        </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={() =>setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete()}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default DeleteCourse;
