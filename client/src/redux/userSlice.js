import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
const initialState = {
    user: null
}
export const userSlice = createSlice({
    name: 'user',
    initialState:initialState,
    reducers: {
        reset: ()=>  initialState,
setUser: (state, action)=>{
state.user = action.payload;
}
    }
 
})

export const {setUser,reset} = userSlice.actions