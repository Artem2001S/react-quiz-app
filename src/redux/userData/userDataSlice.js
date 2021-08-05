import { createSlice } from '@reduxjs/toolkit';

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

    userLogin: () => {},
    userSignUp: () => {},
    checkIsAuthorized: () => {},
    userLogout: () => {},
  },
});

export const {
  userAuthorized,
  userExited,
  userAuthorizationChecked,
  userLogin,
  userSignUp,
  checkIsAuthorized,
  userLogout,
} = userDataSlice.actions;
export default userDataSlice.reducer;
