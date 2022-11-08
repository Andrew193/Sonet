import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    notifications: []
};

const notificationsReducer = createSlice({
    name: "notifications-reducer",
    initialState,
    reducers: {
        dropNotifications: (state) => {
            state.notifications = [];
        },
        setNotifications: (state, action) => {
            state.notifications.push(action?.payload)
        }
    },
    extraReducers: ({})
})

export const {
    dropNotifications,
    setNotifications

} = notificationsReducer.actions;

export default notificationsReducer.reducer;