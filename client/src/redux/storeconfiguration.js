import {combineReducers} from "redux";
import userSlice from "./userSlice";
import {configureStore} from "@reduxjs/toolkit";
import postSlice from "./postSlice";


const rootReducer = combineReducers({
    user: userSlice,
    posts: postSlice
})

const store = configureStore({
    reducer: rootReducer
})

export default store