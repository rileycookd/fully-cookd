import { createSlice } from "@reduxjs/toolkit"

const initialStateValue = {
  registration: {},
  chosenPackage: {} 
}

export const addClassesSlice = createSlice({
  name: "addClasses",
  initialState: initialStateValue,
  reducers: {
    changePackage: (state, action) => {
      state.chosenPackage = action.payload;
    },
    changeRegistration: (state, action) => {
      state.registration = action.payload;
    }
  }
});

export const { 
  changePackage,
  changeRegistration
} = addClassesSlice.actions; 

export default addClassesSlice.reducer; 