import React  from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { makeStyles,  } from "@material-ui/core/styles";
import Library from "@material-ui/icons/LocalLibrary";

import authAPI from "../api/auth";
import { userState, signOut } from "../redux/userSlice";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

const AuthOptions = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector(userState);

  const redirect = (path) => {
    history.push(path);
  };

  const logOut = () => {
    dispatch(signOut());
  };

  return (
    <>
      {!loggedIn && (
        <Link className={classes.link} to="/signIn">
          <Button className={classes.button}>Sign In</Button>
        </Link>
      )}
      {loggedIn && (
        <>
          {user.instructor && (
            <Link className={classes.link} to="/teach/courses">
              <Button className={classes.button}>
                <Library /> Teach
              </Button>
            </Link>
          )}
          <Link className={classes.link} to="/users">
            <Button className={classes.button}>users</Button>
          </Link>

          <Link className={classes.link} to={`/user/${user._id}`}>
            <Button className={classes.button}>Profile</Button>
          </Link>

          <Button
            className={classes.link}
            onClick={() => {
              logOut();
              redirect("/");
            }}
          >
            Sign out
          </Button>
        </>
      )}
    </>
  );
};

export default AuthOptions;
