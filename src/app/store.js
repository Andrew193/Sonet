import {configureStore} from '@reduxjs/toolkit';
import postReducer from "./postReducer"
import notificationsReducer from "./notificationReducer"

const store = configureStore({
    reducer: {
        post: postReducer,
        notifications: notificationsReducer
    }
});

export function getStore() {
    return store;
}

export default store;