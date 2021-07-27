import { createSlice } from '@reduxjs/toolkit';

const name = 'userInterface';
const initialState = {
  isLoading: false,
};

const userInterfaceSlice = createSlice({
  name,
  initialState,
  reducers: {
    loadingStarted: (state) => {
      state.isLoading = true;
    },

    loadingFinished: (state) => {
      state.isLoading = false;
    },
  },
});

export default userInterfaceSlice.reducer;
export const { loadingStarted, loadingFinished } = userInterfaceSlice;
