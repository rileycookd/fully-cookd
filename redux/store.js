import { configureStore } from '@reduxjs/toolkit';
import registerClassesReducer from './features/registerClassesSlice';
import addClassesReducer from './features/addClassesSlice'

const reducer = {
  registerClasses: registerClassesReducer,
  addClasses: addClassesReducer
};

const store = configureStore({
  reducer,
});

export default store;