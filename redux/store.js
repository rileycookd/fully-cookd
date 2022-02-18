import { configureStore } from '@reduxjs/toolkit';
import registerClassesReducer from './features/registerClassesSlice';

const reducer = {
  registerClasses: registerClassesReducer,
};

const store = configureStore({
  reducer,
});

export default store;