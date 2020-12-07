import React, {useState} from "react"
import { useSelector, useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import DeleteIcon from "@material-ui/icons/Delete"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import authAPI from "../../api/auth"


const DeleteCourse =(props) => {
    const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  

  const handleClick = () => {
    setOpen(true)
  }

const handleDelete = () => {
    dispatch()
}


  const handleClose = () => {
    setOpen(false)
  }
    return (<span>
      <IconButton aria-label="Delete" onClick={() => handleClick()} color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Delete ${props.course.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your course {props.course.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete()} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
}

export default DeleteCourse