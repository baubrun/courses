import React from 'react'
import Loader from "react-loader-spinner";
import Backdrop from '@material-ui/core/Backdrop';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Spinner = ({show, text}) => {
  const classes = useStyles();

  return (
    <Backdrop 
    className={classes.backdrop} 
    open={show} 
    >
      {text}
      <Loader
        type="ThreeDots"
        color="#00b2cc"
        height={100}
        width={100}
      />
    </Backdrop>
  );
};


export default Spinner