import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/PrivateRoute/reducers/userReducer";
import commentReducer from "./features/Post/reducers/commentReducer";

export const store = configureStore({
    reducer: {
        userStore: userReducer,
        commentStore: commentReducer
    }
});