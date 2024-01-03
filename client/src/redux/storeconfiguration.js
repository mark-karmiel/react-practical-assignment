import {combineReducers} from "redux";
import userSlice from "./userSlice";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    user: userSlice
})

const store = configureStore({
    reducer: rootReducer
})

export default store