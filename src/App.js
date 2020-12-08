import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./config/theme";
import Home from "./views/Home";
import Users from "./components/user/Users";
import NotFound from "./views/NotFound";
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


const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/users" component={Users} />

          <Route path="/signUp" component={SignUp} />
          <Route path="/signIn" component={SignIn} />

          <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
          <Route path="/user/:userId" component={Profile} />
          <Route path="/course/:courseId" component={Course} />
          <PrivateRoute path="/teach/courses" component={MyCourses} />

          <PrivateRoute path="/teach/course/new" component={NewCourse} />
          <PrivateRoute
            path="/teach/course/edit/:courseId"
            component={EditCourse}
          />
          <PrivateRoute path="/teach/course/:courseId" component={Course} />
          {/* <PrivateRoute path="/learn/:enrollmentId" component={Enrollment} /> */}

          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
