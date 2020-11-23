import {
    createSlice
} from '@reduxjs/toolkit';



export const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        user: {},
    },
    reducers: {
        loadUser: (state, action) => {
            state.user = action.payload
        },
        signInAction: (state, action) => {
            state.loggedIn = true
            state.user = action.payload
        },
        signOutAction: (state) => {
            state.loggedIn = false
            state.user = {}
        },
    }
})


export const {
    signInAction,
    signOutAction,
    loadUser
} = userSlice.actions
export const userState = state => state.user
export default userSlice.reducer