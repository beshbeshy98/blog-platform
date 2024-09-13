import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./reducers/postReducer";
import { postDetailsReducer } from "./reducers/postDetailsReducer";
import { authReducer } from "./reducers/authReducer";

const rootReducer = {
    posts: postReducer,
    postDetails: postDetailsReducer,
    auth: authReducer
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;