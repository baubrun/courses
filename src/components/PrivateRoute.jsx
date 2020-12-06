import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState } from "../redux/userSlice";
import authAPI from "../api/auth";
import SignIn from "./user/SignIn"



const PrivateRoute = ({ component, ...options }) => {
  const { loggedIn } = useSelector(userState);

  const finalComponent =
    loggedIn && authAPI.isAuthenticated() ? component : SignIn;

  return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
