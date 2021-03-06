import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import clsx from "clsx";

import authAPI from "../../api/auth";
import Enroll from "../enroll/Enroll";

import { userState } from "../../redux/userSlice";


const useStyles = makeStyles((theme) => ({
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  gridList: {
    width: "100%",
    minHeight: 200,
    padding: "16px 0px 0px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  tile: {
    textAlign: "center",
    border: "1px solid #cecece",
    backgroundColor: "#04040c",
  },
  image: {
    height: "100%",
  },
  tileBar: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    textAlign: "left",
  },
  tileTitle: {
    fontSize: "1.1em",
    marginBottom: "5px",
    color: "#fffde7",
    display: "block",
  },
  action: {
    margin: "0px 10px",
  },
}));

const Courses = (props) => {
  const { user } = useSelector(userState);
  const classes = useStyles();


  return (
    <GridList cellHeight={220} className={classes.gridList} cols={2}>
      {props.courses.map((course, idx) => {
        if (course.published){

        return (
          <GridListTile
            className={classes.tile}
            key={idx}
            style={{ padding: 0 }}
          >
            <Link className={classes.link} to={`/course/${course._id}`}>
              <img
                className={classes.image}
                src={`${process.env.PUBLIC_URL}/images/${course.image}`}
                alt={course.name}
              />
            </Link>
            <GridListTileBar
              className={classes.tileBar}
              title={
                <Link
                  to={`/course/${course._id}`}
                  className={clsx([classes.tileTitle, classes.link])}
                >
                  {course.name}
                </Link>
              }
              subtitle={<span>{course.category}</span>}
              actionIcon={
                <div className={classes.action}>
                  {authAPI.isAuthenticated() && user._id ? (
                    <Enroll courseId={course._id} />
                  ) : (
                    <Link className={classes.link} to="/signIn">
                      Sign in to enroll
                    </Link>
                  )}
                </div>
              }
            />
          </GridListTile>
        )
            }
      })}
    </GridList>
  );
};

export default Courses;
