import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WindowWidthState {
    width: number;
}

const initialState: WindowWidthState = {
    width: window.innerWidth,
};

const windowWidthSlice = createSlice({
    name: "windowWidth",
    initialState,
    reducers: {
        updateWidth: (state, action: PayloadAction<number>) => {
            state.width = action.payload;
        },
    },
});

export const { updateWidth } = windowWidthSlice.actions;
export default windowWidthSlice.reducer;