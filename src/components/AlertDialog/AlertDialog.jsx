import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { cancelAlert, continueAlert } from "../../redux/layoutSlice"

const AlertDialog = (props) => {
  const dispatch = useDispatch();
  const {
    message,
    title,
    onOpen,
  } = props;

  const handleCancel = () => {
    dispatch(cancelAlert());
  };

  const handleContinue = () => {
    dispatch(continueAlert());
  };

  return (
    <div>
      <Dialog
        open={onOpen}
      >
        <DialogTitle style={{ textAlign: 'center' }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="textPrimary">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()} color="secondary">
            ANNULER
          </Button>
          <Button onClick={() => handleContinue()} color="primary" autoFocus>
            CONTINUER
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
