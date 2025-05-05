import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShareButtonState {
    currentComponent: string | null;
}

const initialState: ShareButtonState = { currentComponent: null };

const shareButtonSlice = createSlice({
    name: "shareButton",
    initialState,
    reducers: {
        setComponent: (state, action: PayloadAction<string | null>) => {
            state.currentComponent = action.payload;
        },
    },
});

export const { setComponent } = shareButtonSlice.actions;
export default shareButtonSlice.reducer;