import instance from 'redux/axios/instance';

export const userLoginRequest = ({ username, password }) =>
  instance.post('/signin', { username, password });

export const getCurrentUserRequest = () => instance.get('/users/current');
