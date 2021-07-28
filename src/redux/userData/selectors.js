import { createSelector } from 'reselect';

export const getUserDataSelector = (state) => state.userData.user;
export const getIsAuthorizedSelector = createSelector(
  getUserDataSelector,
  (user) => user !== null
);

export const getIsUserAdminSelector = createSelector(
  getUserDataSelector,
  (user) => user?.is_admin
);

export const getIsUserAuthorizationCheckedSelector = (state) =>
  state.userData.isUserAuthorizationChecked;
