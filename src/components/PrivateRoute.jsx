import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState } from "../redux/userSlice";
import {isAuthenticated} from "../api/auth"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loggedIn, } = useSelector(userState);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn  && isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
