import { configureStore } from '@reduxjs/toolkit';
import registerClassesReducer from './features/registerClassesSlice';
import addClassesReducer from './features/addClassesSlice'
import modalSliceReducer from './features/modalSlice'

const reducer = {
  registerClasses: registerClassesReducer,
  addClasses: addClassesReducer,
  modal: modalSliceReducer,
};

const store = configureStore({
  reducer,
});

export default store;