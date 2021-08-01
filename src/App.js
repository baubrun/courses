import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./css/theme";
import Home from "./views/Home";
import Users from "./components/user/Users";
import SignUp from "./components/user/SignUp";
import SignIn from "./components/user/SignIn";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";
import NavBar from "./components/NavBar";
import NewCourse from "./components/course/NewCourse";
import MyCourses from "./components/course/MyCourses";
import Course from "./components/course/Course";
import PrivateRoute from "./components/PrivateRoute";
import EditCourse from "./components/course/EditCourse"
import Enrollment from "./components/enroll/Enrollment"
import Layout from "./components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { showLoader } from "./redux/layoutSlice";

const routes = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      <Route path="/user/:userId" component={Profile} />
      <Route path="/course/:courseId" component={Course} />
      <PrivateRoute path="/teach/courses" component={MyCourses} />

      <PrivateRoute path="/teach/course/new" component={NewCourse} />
      <PrivateRoute path="/teach/course/edit/:courseId" component={EditCourse} />
      <PrivateRoute path="/teach/course/:courseId" component={Course} />
      <PrivateRoute path="/learn/:enrollmentId" component={Enrollment} />
      <Redirect to="/" component={Home} />
    </Switch>
  )
}


const App = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(showLoader())
  // }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Layout>
          {routes()}
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
