import { createSelector } from 'reselect';

const getUserDataState = (state) => state.userData;

export const getUserDataSelector = createSelector(
  getUserDataState,
  (userDataState) => userDataState.user
);

export const getIsAuthorizedSelector = createSelector(
  getUserDataSelector,
  (user) => user !== null
);

export const getIsUserAdminSelector = createSelector(
  getUserDataSelector,
  (user) => user?.is_admin
);

export const getIsUserAuthorizationCheckedSelector =
  createSelector(
    getUserDataState,
    (userDataState) => userDataState.isUserAuthorizationChecked
  );
