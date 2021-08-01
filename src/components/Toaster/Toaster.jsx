import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'

const Toaster = (props) => {
  // status: error, info, success, warning
  const { show, message, status, onClose } = props;

  return (
    <Snackbar open={show} autoHideDuration={5000} onClose={onClose}>
      <Alert elevation={6} variant="filled" onClose={onClose} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
