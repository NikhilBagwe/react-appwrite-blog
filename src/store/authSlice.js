import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status : false,
    userData : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        // here login is a action
        login : (state, action) => {
            state.status = true
            state.userData = action.payload.userData
        },
        logout : (state) => {
            state.status = false,
            state.userData = null
        }
    }
})

// exporting actions for the components to use
export const {login, logout} = authSlice.actions

// exporting reducers
export default authSlice.reducer