import instance from 'redux/axios/instance';

export const fetchTestRequest = (testId) => instance.get(`/tests/${testId}`);
export const patchTestRequest = (testId, title) =>
  instance.patch(`/tests/${testId}`, { title });

export const deleteAnswerRequest = (answerId) =>
  instance.delete(`/answers/${answerId}`);
