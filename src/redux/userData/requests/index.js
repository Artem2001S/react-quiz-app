import instance from 'redux/axios/instance';

export const userLoginRequest = ({ username, password }) =>
  instance.post('/signin', { username, password });

export const getCurrentUserRequest = () => instance.get('/users/current');
export const userLogoutRequest = () => instance.delete('/logout');
export const userSignUpRequest = ({ username, password, isAdmin }) =>
  instance.post('/signup', {
    username,
    password,
    password_confirmation: password,
    is_admin: isAdmin,
  });
