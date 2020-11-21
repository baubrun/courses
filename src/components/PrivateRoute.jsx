import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState } from "../redux/userSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loggedIn, } = useSelector(userState);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
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
