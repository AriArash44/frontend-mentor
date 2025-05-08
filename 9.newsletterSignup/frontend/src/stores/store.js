import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import mySliceReducer from './mySlice';

const store = configureStore({
  reducer: {
    mySlice: mySliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
