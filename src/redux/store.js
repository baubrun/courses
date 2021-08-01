import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../redux/userSlice"
import courseReducer from "../redux/courseSlice"
import enrollmentReducer from "../redux/enrollmentSlice"
import layoutReducer from "../redux/layoutSlice"


export default configureStore({
    reducer: {
        user: userReducer,
        course: courseReducer,
        enrollment: enrollmentReducer,
        layout: layoutReducer,
    }
})