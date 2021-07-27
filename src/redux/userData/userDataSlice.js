import { createAction, createSlice } from '@reduxjs/toolkit';

const name = 'userData';
const initialState = {
  user: null,
};

const userDataSlice = createSlice({
  name,
  initialState,
  reducers: {
    userAuthorized: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const userLogin = createAction(`${name}/userLogin`);
export const checkIsAuthorized = createAction(`${name}/checkIsAuthorized`);

export const { userAuthorized } = userDataSlice.actions;
export default userDataSlice.reducer;
