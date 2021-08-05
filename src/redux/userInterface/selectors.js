import { createSelector } from 'reselect';

const getUserInterfaceState = (state) => state.userInterface;

export const getIsLoadingSelector = createSelector(
  getUserInterfaceState,
  (userInterfaceState) => userInterfaceState.isLoading
);

export const getMessageSelector = createSelector(
  getUserInterfaceState,
  (userInterfaceState) => userInterfaceState.message
);
