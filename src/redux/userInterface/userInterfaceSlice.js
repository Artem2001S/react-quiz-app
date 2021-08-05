import { createSlice } from '@reduxjs/toolkit';

const name = 'userInterface';
const initialState = {
  isLoading: false,
  message: '',
};

const userInterfaceSlice = createSlice({
  name,
  initialState,
  reducers: {
    loadingStarted: (state) => {
      state.isLoading = true;
      state.message = '';
    },

    loadingFinished: (state) => {
      state.isLoading = false;
    },

    messageReceived: (state, { payload }) => {
      state.message = payload.message;
    },

    messageDeleted: (state) => {
      state.message = '';
    },
  },
});

export default userInterfaceSlice.reducer;
export const {
  loadingStarted,
  loadingFinished,
  messageReceived,
  messageDeleted,
} = userInterfaceSlice.actions;
