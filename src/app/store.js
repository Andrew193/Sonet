import {configureStore} from '@reduxjs/toolkit';
import postReducer from "./postReducer"
import notificationsReducer from "./notificationReducer"

const store = configureStore({
    reducer: {
        post: postReducer,
        notifications: notificationsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['notifications-reducer/setNotificationsToShow'],
                // Ignore these field paths in all actions
                ignoredActionPaths: [],
                // Ignore these paths in the state
                ignoredPaths: ['notifications.notificationsToShow'],
            },
        }),
});

export function getStore() {
    return store;
}

export default store;