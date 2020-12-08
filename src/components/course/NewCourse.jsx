import React, { useState, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";


import { userState  } from "../../redux/userSlice";
import { createCourse  } from "../../redux/courseSlice";

const IMG_DIM = 200;

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2),
  },
  cancel: {
    textDecoration: "none"
  },
  error: {
    backgroundColor: "#ff3333",
    color: "white",
    cursor: "pointer",
    verticalAlign: "middle",
    padding: "10px",
  },
  filename: {
    marginLeft: "10px",
  },
  image: {
    objectFit: "contain",
    height: IMG_DIM,
    width: IMG_DIM,
  },
  input: {
    display: "none",
  },
  link: {
    textDecoration: "none",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
}));

const NewCourse = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(userState);
  const [file, setFile] = useState({});
  const [values, setValues] = useState({
    category: "",
    description: "",
    error: "",
    image: "",
    name: "",
    redirect: false,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  const handleSubmit = (evt) => {
    evt.preventDefault()

    const newCourse = {
      category: values.category,
      description: values.description,
      instructor: user._id ,
      name: values.name,
      image: file,
    }
    const data = {
      data: newCourse,
      id: user._id
    }
    dispatch(createCourse(data))
  };

  if (values.redirect) {
    return <Redirect to={"/teach/courses"} />;
  }

  return (
    <form >
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            New Course
          </Typography>
          <br/>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            name="image"
            onChange={(evt) => setFile(evt.target.files[0])}
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button color="secondary" component="span" variant="contained">
              Upload Image <FileUpload />
            </Button>
          </label>

          <span className={classes.filename}>
            {values.image ? values.image : ""}
          </span>
          <br/>
          <TextField
            className={classes.textField}
            id="name"
            label="Name"
            margin="normal"
            name="name"
            onChange={(evt) => handleChange(evt)}
            value={values.name}
          />
          <br/>
          <TextField
            className={classes.textField}
            id="multiline-flexible"
            label="Description"
            margin="normal"
            multiline
            name="description"
            onChange={(evt) => handleChange(evt)}
            rows="2"
            value={values.description}
          />
          <br/>
          <TextField
            className={classes.textField}
            id="category"
            label="Category"
            margin="normal"
            name="category"
            onChange={(evt) => handleChange(evt)}
            value={values.category}
          />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            className={classes.btn}
            color="primary"
            onClick={(evt) => handleSubmit(evt)}
            variant="contained"
          >
            Submit
          </Button>
          
          <Link className={classes.cancel} to="/teach/courses" className={classes.btn}>
            <Button
              className={classes.btn}
              onClick={() => history.push("/teach/courses")}
              variant="contained"
            >
              Cancel
            </Button>
          </Link>

        </CardActions>
      </Card>
    </form>
  );
};

export default NewCourse;
