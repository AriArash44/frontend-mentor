import { configureStore } from '@reduxjs/toolkit';
import fetchResultSlice from './slices/fetchResultState';
import buttonStateSlice from './slices/buttonStateSlice';

const store = configureStore({
    reducer: {
        fetchResultSlice: fetchResultSlice,
        buttonStateSlice: buttonStateSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;