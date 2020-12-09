import React, {useState} from 'react'

import {Redirect} from 'react-router-dom'


import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'



const DeleteUser = (props) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [redirect, setRedirect] = useState(false)


    const deleteAccount = () => { 
     
      }
    
      if (redirect) {
        return <Redirect to='/'/>
      }
    
    return (<span>
        <IconButton aria-label="Delete" onClick={() => setOpenDialog(true)} color="secondary">
          <DeleteIcon/>
        </IconButton>
  
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{"Delete Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm to delete your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => deleteAccount()} color="secondary" autoFocus="autoFocus">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </span>)
  }

export default DeleteUser
