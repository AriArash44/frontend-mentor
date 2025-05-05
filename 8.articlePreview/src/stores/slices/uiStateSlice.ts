import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    active: boolean;
}

const initialState: UIState = { active: false };

const uiStateSlice = createSlice({
    name: "uiState",
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

export const { makeActive, makeInactive, toggleActiveState } = uiStateSlice.actions;
export default uiStateSlice.reducer;