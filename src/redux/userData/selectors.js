import { createSelector } from 'reselect';

export const getUserDataSelector = (state) => state.userData.user;
export const getIsAuthorizedSelector = createSelector(
  getUserDataSelector,
  (user) => user !== null
);
