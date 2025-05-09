import { createSlice } from "@reduxjs/toolkit";

const initialState = { active: false };

const buttonStateSlice = createSlice({
    name: "buttonState",
    initialState,
    reducers: {
        makeActive: (state) => {
            state.active = true;
        },
        makeInactive: (state) => {
            state.active = false;
        },
        toggleActiveState: (state) => {
            state.active = !state.active;
        },
    },
});

export const { makeActive, makeInactive, toggleActiveState } = buttonStateSlice.actions;
export default buttonStateSlice.reducer;