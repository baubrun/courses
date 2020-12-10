import React, {useState, useEffect} from "react"
import {Redirect} from "react-router-dom"

import Button from "@material-ui/core/Button"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    form: {
        minWidth: 500
    }
}))

function Enroll(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
    enrollmentId: "",
    error: "",
    redirect: false
  })




    if(values.redirect){
        return (<Redirect to={`/learn/${values.enrollmentId}`}/>)
    }

  return (
      <Button variant="contained" color="secondary" onClick={clickEnroll}> Enroll </Button>
  )
}

export default Enroll