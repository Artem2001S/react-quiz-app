import instance from 'redux/axios/instance';

export const fetchTestsRequest = () => instance.get('/tests');
