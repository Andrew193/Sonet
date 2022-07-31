import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    postInformation: {
        length: 0,
        value: '',
        shouldClear: false
    },
};

const postReducer = createSlice({
    name: "post-reducer",
    initialState,
    reducers: {
        dropPostInformation: (state) => {
            state.postInformation = initialState?.postInformation;
        },
        setPostInformation: (state, action) => {
            state.postInformation = {...state?.postInformation, ...action?.payload};
        }
    },
    extraReducers: ({})
})

export const {
    setPostInformation,
    dropPostInformation

} = postReducer.actions;

export default postReducer.reducer;