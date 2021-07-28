import instance from 'redux/axios/instance';

export const fetchTestsRequest = () => instance.get('/tests');
export const postTestRequest = (title) => instance.post('/tests', { title });
export const deleteTestRequest = (id) => instance.delete(`/tests/${id}`);
