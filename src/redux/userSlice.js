import {
    createSlice
} from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: "user",
    initialState: {
        // loggedIn: false,
        loggedIn: true,
        // user: {},
        user: {
            instructor: true,
            email:"bb@bb.com",
            _id:"5fb6c60af624e64b689ec938",
            name:"bb",
        }
    },
    reducers: {
        loadUser: (state, action) => {
            state.user = action.payload
        },
        signInAction: (state, action) => {
            state.loggedIn = true
            state.user =  action.payload
        },
        signOutAction: (state) => {
            state.loggedIn = false
            state.user = {}
        },
    }
})


export const {signInAction, signOutAction, loadUser} = userSlice.actions
export const userState = state => state.user
export default userSlice.reducer