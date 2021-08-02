import instance from 'redux/axios/instance';
import { testsListSortTypes } from 'shared/constants';

export const fetchTestsRequest = (
  page = 1,
  sort = testsListSortTypes.createdAtAsc
) => instance.get(`/tests?page=${page}&sort=${sort}`);
export const postTestRequest = (title) => instance.post('/tests', { title });
export const deleteTestRequest = (id) => instance.delete(`/tests/${id}`);
