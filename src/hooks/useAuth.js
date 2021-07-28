import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsAuthorizedSelector,
  getUserDataSelector,
} from 'redux/userData/selectors';
import { userLogout } from 'redux/userData/userDataSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserDataSelector);
  const isAuthorized = useSelector(getIsAuthorizedSelector);

  const logout = useCallback(() => dispatch(userLogout()), [dispatch]);

  return {
    user,
    isAuthorized,
    logout,
  };
};
