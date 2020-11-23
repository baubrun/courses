import React from "react"
import {Route, Switch} from "react-router-dom"
import Home from "../views/Home"
import Users from "./user/Users"
import NotFound from "../views/NotFound"
import SignUp from "./user/SignUp"
import SignIn from "./user/SignIn"
import Profile from "./user/Profile"
import PrivateRoute from "../components/PrivateRoute"
import EditProfile from "./user/EditProfile"
import Menu from "./Menu"
import NewCourse from "./course/NewCourse"
import MyCourses from "./course/MyCourses"
import Course from "./course/Course"



const Routers = () => {

    return (
        <>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route  path="/users" component={Users}/>
            <Route path="/signUp" component={SignUp}/>
            <Route path="/signIn" component={SignIn}/>

            <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
            <Route path="/user/:userId" component={Profile}/>
            {/* <PrivateRoute path="/teach/courses" component={MyCourses}/> */}
            <Route path="/teach/courses" component={MyCourses}/>
            <Route path="/course/:courseId" component={Course}/>
            <PrivateRoute path="/teach/course/new" component={NewCourse} />
            <Route path="/teach/course/:courseId" component={Course}/>

            <Route component={NotFound} />
        </Switch>
        </>
    )
}

export default Routers
