import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/PrivateRoute/reducers/userReducer";

export const store = configureStore({
    reducer: {
        userStore: userReducer
    }
});