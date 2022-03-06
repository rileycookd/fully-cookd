import { createSlice } from "@reduxjs/toolkit"

const initialStateValue = {
  showModal: false,
  modalContent: '' 
}

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialStateValue,
  reducers: {
    showModal: (state, action) => {
      state.modalContent = action.payload;
      state.showModal = true;
    },
    clearModal: (state, action) => {
      state.modalContent = '';
      state.showModal = false;
    }
  }
});

export const { 
  showModal,
  // setModalContent,
  clearModal
} = modalSlice.actions; 

export default modalSlice.reducer; 