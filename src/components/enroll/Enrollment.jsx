import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Info from "@material-ui/icons/Info";
import CheckCircle from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

import { enrollmentState, clearError, completeEnrollment } from "../../redux/enrollmentSlice";
import { userState } from "../../redux/userSlice";
import authAPI from "../../api/auth";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({  error: {
    backgroundColor: "#ff3333",
    color: "white",
    cursor: "pointer",
    verticalAlign: "middle",
    padding: "10px",
  },
  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: "auto",
    marginTop: theme.spacing(12),
    marginLeft: 250,
  }),
  heading: {
    marginBottom: theme.spacing(3),
    fontWeight: 200,
  },
  flex: {
    display: "flex",
    marginBottom: 20,
  },
  card: {
    padding: "24px 40px 20px",
  },
  subheading: {
    margin: "10px",
    color: theme.palette.openTitle,
  },
  details: {
    margin: "16px",
  },
  sub: {
    display: "block",
    margin: "3px 0px 5px 0px",
    fontSize: "0.9em",
  },
  avatar: {
    color: "#9b9b9b",
    border: "1px solid #bdbdbd",
    background: "none",
  },
  media: {
    height: 180,
    display: "inline-block",
    width: "100%",
    marginLeft: "16px",
  },
  icon: {
    verticalAlign: "sub",
  },
  category: {
    color: "#5c5c5c",
    fontSize: "0.9em",
    padding: "3px 5px",
    backgroundColor: "#dbdbdb",
    borderRadius: "0.2em",
    marginTop: 5,
  },
  action: {
    margin: "8px 24px",
    display: "inline-block",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: "#616161",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  selectedDrawer: {
    backgroundColor: "#e9e3df",
  },
  unselected: {
    backgroundColor: "#ffffff",
  },
  check: {
    color: "#38cc38",
  },
  subhead: {
    fontSize: "1.2em",
  },
  progress: {
    textAlign: "center",
    color: "#dfdfdf",
    "& span": {
      color: "#fffde7",
      fontSize: "1.15em",
    },
  },
  whiteSpace: {
    whiteSpace: "pre-wrap",
  },
}));

const Enrollment = (props) => {
  const classes = useStyles();
  const { enrollment, error } = useSelector(enrollmentState);
  const { user } = useSelector(userState);
  const dispatch = useDispatch();
  const [totalComplete, setTotalComplete] = useState(0);
  const [values, setValues] = useState({
    errorMsg: "",
    drawer: -1,
  });
  const [enrollmentData, setEnrollmentData] = useState({});


  const closeErrors = () => {
    setValues({ ...values, errorMsg: "" });
    dispatch(clearError());
  };

  useEffect(() => {
    if (props.enrollments) {
      const found = props.enrollments.find(i => i.student === user.Id)
      setEnrollmentData(found);
    }
  }, [props.enrollments]);


  useEffect(() => {
    if (error) {
      setValues({ ...values, errorMsg: error });
    }
  }, [error]);

  const selectDrawer = (evt, idx) => {
    setValues({ ...values, drawer: idx });
  };

  
  const totalCompleted = (lessons) => {
    let count = lessons.reduce((total, lessonStatus) => 
      total + (lessonStatus.complete ? 1 : 0), 0)
    setTotalComplete(count);
    return count;
  };


  const markComplete = () => {
    if (!enrollmentData.lessonStatus[values.drawer].complete) {
      const lessonStatus = _.cloneDeep(enrollmentData.lessonStatus);

      lessonStatus[values.drawer].complete = true;

      const count = totalCompleted(lessonStatus);

      let data = {
          enrollment: {},
          enrollmentId: props.match.params.enrollmentId
      };
      data.enrollment.lessonStatusId = lessonStatus[values.drawer]._id;
      data.enrollment.complete = true;

      if (count === lessonStatus.length) {
        data.enrollment.courseCompleted = Date.now();
      }

      dispatch(completeEnrollment(data))
    }
  };


  if (_.isEmpty(enrollmentData)) return null

  return (
    <Box className={classes.root}>
      <Drawer variant="permanent">
        <Box className={classes.toolbar} />
        <List>
          <ListItem
            button
            onClick={() => selectDrawer(-1)}
            className={
              values.drawer == -1 ? classes.selectedDrawer : classes.unselected
            }
          >
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="Course Overview" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListSubheader component="div">Lessons</ListSubheader>
          {enrollmentData.lessonStatus.map((lesson, idx) => (
            <ListItem
              button
              key={idx}
              onClick={() => selectDrawer(idx)}
              className={
                values.drawer == idx
                  ? classes.selectedDrawer
                  : classes.unselected
              }
            >
              <ListItemAvatar>
                <Avatar> {idx + 1} </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={enrollmentData.course.lessons[idx].title}
              />
              <ListItemSecondaryAction>
                {lesson.complete ? (
                  <CheckCircle />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText
              primary={
                <div className={classes.progress}>
                  <span>{totalComplete}</span> out of
                  <span>{enrollmentData.lessonStatus.length}</span> completed
                </div>
              }
            />
          </ListItem>
        </List>
      </Drawer>
      {values.drawer == -1 && (
        <Card className={classes.card}>
          <CardHeader
            title={enrollmentData.course.name}
            subheader={
              <div>
                <Link
                  to={"/user/" + enrollmentData.course.instructor._id}
                  className={classes.sub}
                >
                  By {enrollmentData.course.instructor.name}
                </Link>
                <span className={classes.category}>
                  {enrollmentData.course.category}
                </span>
              </div>
            }
            action={
              totalComplete == enrollmentData.lessonStatus.length && (
                <span className={classes.action}>
                  <Button variant="contained" color="secondary">
                    <CheckCircle /> &nbsp; Completed
                  </Button>
                </span>
              )
            }
          />
          <div className={classes.flex}>
            <CardMedia
              className={classes.media}
              image={`${process.env.PUBLIC_URL}/images/${enrollmentData.course.image}`}
              title={enrollmentData.course.name}
            />
            <div className={classes.details}>
              <Typography variant="body1" className={classes.subheading}>
                {enrollmentData.course.description}
                <br />
              </Typography>
            </div>
          </div>
          <Divider />
          <div>
            <CardHeader
              title={
                <Typography variant="h6" className={classes.subheading}>
                  Lessons
                </Typography>
              }
              subheader={
                <Typography variant="body1" className={classes.subheading}>
                  {enrollmentData.course.lessons &&
                    enrollmentData.course.lessons.length}{" "}
                  lessons
                </Typography>
              }
              action={
                authAPI.isAuthenticated() &&
                user._id == enrollmentData.course.instructor._id && (
                  <span className={classes.action}></span>
                )
              }
            />
            <List>
              {enrollmentData.course.lessons &&
                enrollmentData.course.lessons.map((lesson, i) => {
                  return (
                    <span key={i}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>{i + 1}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={lesson.title} />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </span>
                  );
                })}
            </List>
          </div>
        </Card>
      )}
      {values.drawer != -1 && (
        <>
          <Typography variant="h5" className={classes.heading}>
            {enrollmentData.course.name}
          </Typography>
          <Card className={classes.card}>
            <CardHeader
              title={enrollmentData.course.lessons[values.drawer].title}
              action={
                <Button
                  onClick={() => markComplete()}
                  variant={
                    enrollmentData.lessonStatus[values.drawer].complete
                      ? "contained"
                      : "outlined"
                  }
                  color="secondary"
                >
                  {enrollmentData.lessonStatus[values.drawer].complete
                    ? "Completed"
                    : "Mark as complete"}
                </Button>
              }
            />
            <CardContent>
              <Typography variant="body1" className={classes.para}>
                {enrollmentData.course.lessons[values.drawer].content}
              </Typography>
            </CardContent>
            <CardActions>
              <a
                href={enrollmentData.course.lessons[values.drawer].resource_url}
              >
                <Button variant="contained" color="primary">
                  Resource Link
                </Button>
              </a>
            </CardActions>

          </Card>
        </>
      )}
      
      {values.errorMsg && (
              <Box onClick={() => closeErrors()}>
                <Typography className={classes.error} component="div">
                  {values.errorMsg}
                </Typography>
              </Box>
            )}
    </Box>
  );
};

export default Enrollment;
