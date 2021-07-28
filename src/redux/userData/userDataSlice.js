import { createAction, createSlice } from '@reduxjs/toolkit';

const name = 'userData';
const initialState = {
  user: null,
  isUserAuthorizationChecked: false,
};

const userDataSlice = createSlice({
  name,
  initialState,
  reducers: {
    userAuthorized: (state, { payload }) => {
      state.user = payload;
    },
    userAuthorizationChecked: (state) => {
      state.isUserAuthorizationChecked = true;
    },
    userExited: (state) => {
      state.user = null;
    },
  },
});

export const userLogin = createAction(`${name}/userLogin`);
export const userSignUp = createAction(`${name}/userSignUp`);
export const checkIsAuthorized = createAction(`${name}/checkIsAuthorized`);
export const userLogout = createAction(`${name}/userLogout`);

export const { userAuthorized, userExited, userAuthorizationChecked } =
  userDataSlice.actions;
export default userDataSlice.reducer;
