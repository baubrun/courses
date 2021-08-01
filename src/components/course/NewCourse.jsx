import React, { useState, useEffect } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { userState } from "../../redux/userSlice";
import {
  courseState,
  createCourse,
  clearError
} from "../../redux/courseSlice";
import { showToaster } from "../../redux/layoutSlice";

// import courseAPI from "../../api/course";

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
    textDecoration: "none",
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
  const { error } = useSelector(courseState);
  const [file, setFile] = useState({});
  const [values, setValues] = useState({
    category: "",
    description: "",
    image: "",
    name: "",
    redirect: false,
    createdNew: false,
  });

  useEffect(() => {
    if (error) {
       dispatch(showToaster({
            message: error,
            status: "error"
          }))
    }
    return () => {
      if (error) dispatch(clearError())
    }
  }, [error]);


  useEffect(() => {
    if(values.createdNew && !error){
      setValues({...values, redirect: true})
    }
  })



  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const newCourse = new FormData();
    newCourse.append("category", values.category);
    newCourse.append("description", values.description);
    newCourse.append("instructor", user._id);
    newCourse.append("name", values.name);
    newCourse.append("image", file);

    const data = {
      course: newCourse,
      userId: user._id,
    };


    dispatch(createCourse(data))
    setValues({...values, createdNew: true})

  };

  if (values.redirect) {
    return <Redirect to={"/teach/courses"} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            New Course
          </Typography>
          <br />
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
          <br />
          <TextField
            className={classes.textField}
            id="name"
            label="Name"
            margin="normal"
            name="name"
            onChange={(evt) => handleChange(evt)}
            value={values.name}
            required
          />
          <br />
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
            required
          />
          <br />
          <TextField
            className={classes.textField}
            id="category"
            label="Category"
            margin="normal"
            name="category"
            onChange={(evt) => handleChange(evt)}
            value={values.category}
            required
          />
          <br />

        </CardContent>
        <CardActions>
          <Button
            className={classes.btn}
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
          <Link
            className={clsx([classes.cancel, classes.btn])}
            to="/teach/courses"
          >
            <Button
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
