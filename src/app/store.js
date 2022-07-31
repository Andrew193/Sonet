import {configureStore} from '@reduxjs/toolkit';
import postReducer from "./postReducer"

const store = configureStore({
    reducer: {
        post: postReducer
    }
});

export function getStore() {
    return store;
}

export default store;