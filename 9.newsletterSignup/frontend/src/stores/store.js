import { configureStore } from '@reduxjs/toolkit';
import fetchResultSlice from './slices/fetchResultState';

const store = configureStore({
    reducer: {
        fetchResultSlice: fetchResultSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
