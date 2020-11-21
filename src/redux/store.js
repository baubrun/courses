import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../redux/userSlice"
import courseReducer from "../redux/courseSlice"


export default configureStore({
    reducer: {
        user: userReducer,
        course: courseReducer,
    }
})