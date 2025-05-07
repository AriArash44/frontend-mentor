import { configureStore } from "@reduxjs/toolkit";
import uiStateReducer from "./slices/uiStateSlice";
import windowWidthReducer, { updateWidth } from "./slices/windowWidthSlice";

const store = configureStore({
    reducer: {
        uiState: uiStateReducer,
        windowWidth: windowWidthReducer,
    },
});

window.addEventListener("resize", () => {
    store.dispatch(updateWidth(window.innerWidth));
});

export type RootState = ReturnType<typeof store.getState>;
export default store;