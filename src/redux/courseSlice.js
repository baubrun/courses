import {
    createSlice
} from '@reduxjs/toolkit';



const courseSlice = createSlice({
    name: "course",
    initialState: {
        course: {},
        courses: [],
    },
    reducers: {
        addCourseAction: (state, action) => {
            state.course = action.payload
        },
        getCoursesAction: state => {},
    }
})


export const {
    addCourseAction
} = courseSlice.actions
export const courseState = state => state.course
export default courseSlice.reducer