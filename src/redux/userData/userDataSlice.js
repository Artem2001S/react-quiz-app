import { createSlice } from '@reduxjs/toolkit';

const name = 'userData';
const initialState = {
  user: null,
};

const userDataSlice = createSlice({
  name,
  initialState,
  reducers: {
    userAuthorized: (state, { payload }) => {},
  },
});

export const { userAuthorized } = userDataSlice.actions;
export default userDataSlice.reducer;
