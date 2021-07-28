import instance from 'redux/axios/instance';

export const fetchTestRequest = (testId) => instance.get(`/tests/${testId}`);
