import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
    notificationsToShow: []
};

const notificationsReducer = createSlice({
    name: "notifications-reducer",
    initialState,
    reducers: {
        dropNotifications: (state) => {
            state.notifications = [];
        },
        setNotificationsToShow: (state, action) => {
            state.notificationsToShow = action?.payload;
        },
        setNotifications: (state, action) => {
            state.notifications.push(action?.payload)
        }
    },
    extraReducers: ({})
})

export const {
    dropNotifications,
    setNotifications,
    setNotificationsToShow
} = notificationsReducer.actions;

export default notificationsReducer.reducer;