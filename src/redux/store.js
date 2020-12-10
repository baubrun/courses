import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../redux/userSlice"
import courseReducer from "../redux/courseSlice"
import enrollmentReducer from "../redux/enrollmentSlice"


export default configureStore({
    reducer: {
        user: userReducer,
        course: courseReducer,
        enrollment: enrollmentReducer,
    }
})