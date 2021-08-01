import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import Divider from "@material-ui/core/Divider";

import { userState } from "../../redux/userSlice";
import {
  updateCourse,
  readCourse,
  courseState,
  clearError,
} from "../../redux/courseSlice";

import authAPI from "../../api/auth";
import _ from "lodash"
import { showToaster } from "../../redux/layoutSlice";


const useStyles = makeStyles((theme) => ({
  action: {
    margin: "8px 24px",
    display: "inline-block",
  },
  card: {
    padding: "24px 40px 40px",
  },
  details: {
    margin: "16px",
  },
  input: {
    display: "none",
  },
  filename: {
    margin: "10px 0",
  },
  error: {
    backgroundColor: "#ff3333",
    color: "white",
    cursor: "pointer",
    verticalAlign: "middle",
    padding: "10px",
  },
  flex: {
    display: "flex",
    marginBottom: 20,
  },
  list: {
    backgroundColor: "#f3f3f3",
  },
  icon: {
    verticalAlign: "sub",
  },
  subheading: {
    margin: "10px",
    color: theme.palette.openTitle,
  },
  media: {
    height: 250,
    display: "inline-block",
    width: "50%",
    marginLeft: "16px",
  },

  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  sub: {
    display: "block",
    margin: "3px 0px 5px 0px",
    fontSize: "0.9em",
  },
  textfield: {
    width: 350,
  },

  upArrow: {
    border: "2px solid #f57c00",
    marginLeft: 3,
    marginTop: 10,
    padding: 4,
  },
}));

const EditCourse = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(userState);
  const { error, course } = useSelector(courseState);
  const [file, setFile] = useState({});
  const [values, setValues] = useState({
    category: "",
    description: "",
    image: "",
    instructor: {},
    lessons: [],
    name: "",
    redirect: false,
  });

  useEffect(() => {
    dispatch(readCourse(match.params.courseId));
  }, [match.params.userId]);

  useEffect(() => {
    if (course) {
      setValues({ ...values, ...course });
    }
  }, [course]);



  const fileImage = () => {
    return (
      <>
        {values && values.image && (
          <Box className={classes.filename}>
            <h4>Image:</h4> {values ? values.image : ""}
          </Box>
        )}
        {file && file.name && (
          <Box className={classes.filename}>
            <h4>New Image:</h4> {file ? file.name : ""}
          </Box>
        )}
      </>
    );
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLessonChange = (evt, idx) => {
    let lessons = _.cloneDeep(values.lessons)
    const { name, value } = evt.target;
    lessons[idx][name] = value;
    setValues({ ...values, lessons });
  };

  const deleteLesson = (evt, idx) => {
    let lessons = _.cloneDeep(values.lessons)
    lessons.splice(idx, 1);
    setValues({ ...values, lessons });
  };

  const moveUpLesson = (evt, idx) => {
    let lessons = [...values.lessons]
    let moveUp = lessons[idx];
    lessons[idx] = lessons[idx - 1];
    lessons[idx - 1] = moveUp;
    setValues({ ...values, lessons });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const newCourse = new FormData();
    newCourse.append("category", values.category);
    newCourse.append("description", values.description);
    newCourse.append("instructor", user._id);
    newCourse.append("name", values.name);
    newCourse.append("lessons",JSON.stringify( values.lessons));
    newCourse.append("image", file)

    const data = {
      course: newCourse,
      courseId: match.params.courseId,
    };
    dispatch(updateCourse(data));
    if (!error) {
      setValues({ ...values, redirect: true });
    }
  };

 
  useEffect(() => {
    if (error) {
       dispatch(showToaster({
            message: error,
            status: "error"
          }))
    }
    return () => {
      dispatch(clearError())
    }
  }, [error]);

  if (values.redirect) {
    return <Redirect to={`/teach/course/${values._id}`} />;
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <form onSubmit={handleSubmit}>
          <CardHeader
            title={
              <TextField
                className={classes.textField}
                id="name"
                label="Name"
                margin="normal"
                name="name"
                onChange={(evt) => handleChange(evt)}
                value={values.name}
              />
            }
            subheader={
              <div>
                <Link
                  to={`/user/${values.instructor._id}`}
                  className={classes.sub}
                >
                  By {values.instructor.name}
                </Link>
                {
                  <TextField
                    className={classes.textField}
                    id="category"
                    label="Category"
                    margin="normal"
                    name="category"
                    onChange={(evt) => handleChange(evt)}
                    value={values.category}
                  />
                }
              </div>
            }
            action={
              authAPI.isAuthenticated() &&
              user._id == values.instructor._id && (
                <span className={classes.action}>
                  <Button variant="contained" color="secondary" type="submit">
                    Save
                  </Button>
                </span>
              )
            }
          />
          <div className={classes.flex}>
            <CardMedia
              className={classes.media}
              image={`${process.env.PUBLIC_URL}/images/${values.image}`}
              title={values.name}
            />
            <div className={classes.details}>
              <TextField
                className={classes.textField}
                id="multiline-flexible"
                label="Description"
                margin="normal"
                multiline
                name="description"
                onChange={(evt) => handleChange(evt)}
                rows="5"
                value={values.description}
                variant="outlined"
              />
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
                <Button color="primary" component="span" variant="contained">
                  CHANGE IMAGE <FileUpload />
                </Button>
              </label>
              {fileImage()}
              <br />
            </div>
          </div>
          <Divider />
          <div>
            <CardHeader
              title={
                <Typography variant="h6" className={classes.subheading}>
                  Lessons - Edit and Rearrange
                </Typography>
              }
              subheader={
                <Typography variant="body1" className={classes.subheading}>
                  {values.lessons && values.lessons.length} lessons
                </Typography>
              }
            />
            <List>
              {values.lessons &&
                values.lessons.map((lesson, idx) => {
                  return (
                    <span key={idx}>
                      <ListItem className={classes.list}>
                        <ListItemAvatar>
                          <>
                            <Avatar>{idx + 1}</Avatar>
                            {idx !== 0 && (
                              <IconButton
                                aria-label="up"
                                color="primary"
                                onClick={(evt) => moveUpLesson(evt, idx)}
                                className={classes.upArrow}
                              >
                                <ArrowUp />
                              </IconButton>
                            )}
                          </>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              <TextField
                                margin="dense"
                                label="Title"
                                type="text"
                                fullWidth
                                name="title"
                                value={lesson.title}
                                onChange={(evt) => handleLessonChange(evt, idx)}
                              />
                              <br />
                              <TextField
                                margin="dense"
                                multiline
                                rows="5"
                                label="Content"
                                type="text"
                                name="content"
                                fullWidth
                                value={lesson.content}
                                onChange={(evt) => handleLessonChange(evt, idx)}
                              />
                              <br />
                              <TextField
                                margin="dense"
                                label="Resource link"
                                type="text"
                                fullWidth
                                name="resource_url"
                                value={lesson.resource_url}
                                onChange={(evt) => handleLessonChange(evt, idx)}
                              />
                              <br />
                            </>
                          }
                        />
                        {!values.published && (
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="up"
                              onClick={(evt) => deleteLesson(evt, idx)}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                      <Divider
                        style={{ backgroundColor: "rgb(106, 106, 106)" }}
                        component="li"
                      />
                    </span>
                  );
                })}
            </List>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditCourse;
