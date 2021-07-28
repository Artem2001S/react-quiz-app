import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsAuthorizedSelector,
  getIsUserAdminSelector,
  getUserDataSelector,
} from 'redux/userData/selectors';
import { userLogout } from 'redux/userData/userDataSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserDataSelector);
  const isAuthorized = useSelector(getIsAuthorizedSelector);

  const logout = useCallback(() => dispatch(userLogout()), [dispatch]);
  const isAdmin = useSelector(getIsUserAdminSelector);

  return {
    user,
    isAuthorized,
    isAdmin,
    logout,
  };
};
