import instance from 'redux/axios/instance';

export const userLoginRequest = ({ username, password }) =>
  instance.post('/signin', { username, password });

export const getCurrentUserRequest = () => instance.get('/users/current');
export const userLogoutRequest = () => instance.delete('/logout');
