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



const Routers = () => {

    return (
        <>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute  path="/users" component={Users}/>
            <Route path="/signUp" component={SignUp}/>
            <Route path="/signIn" component={SignIn}/>
            <Route path="/teach/course/new" component={NewCourse} />
            <Route path="/teach/courses" component={MyCourses}/>
            <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
            <Route path="/user/:userId" component={Profile}/>
            <Route component={NotFound} />
        </Switch>
        </>
    )
}

export default Routers
