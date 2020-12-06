import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState } from "../redux/userSlice";
import authAPI from "../api/auth";
import SignIn from "./user/SignIn";

// const PrivateRoute = ({ component, ...options }) => {
//   const { loggedIn } = useSelector(userState);

//   const finalComponent =
//     loggedIn && authAPI.isAuthenticated() ? component : SignIn;

//   return <Route {...options} component={finalComponent} />;
// };

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useSelector(userState);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn && authAPI.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signIn",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
