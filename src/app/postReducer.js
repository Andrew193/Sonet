import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    postInformation: {
        length: 0,
        value: '',
        shouldClear: false,
        possibleMentions: [],
        selectedMention: '',
        focusPosition: null,
        sharedInfo: 'all'
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
            if (Array.isArray(action?.payload)) {
                const newState = {...state?.postInformation};
                action?.payload?.forEach((value) => Object.assign(newState, value))
                state.postInformation = {...newState};
            } else {
                state.postInformation = {...state?.postInformation, ...action?.payload};
            }
        }
    },
    extraReducers: ({})
})

export const {
    setPostInformation,
    dropPostInformation

} = postReducer.actions;

export default postReducer.reducer;