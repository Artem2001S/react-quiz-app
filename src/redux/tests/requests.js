import instance from 'redux/axios/instance';

export const fetchTestsRequest = (page = 1) =>
  instance.get(`/tests?page=${page}`);
export const postTestRequest = (title) => instance.post('/tests', { title });
export const deleteTestRequest = (id) => instance.delete(`/tests/${id}`);
