import instance from 'redux/axios/instance';

export const fetchTestRequest = (testId) => instance.get(`/tests/${testId}`);
export const patchTestRequest = (testId, title) =>
  instance.patch(`/tests/${testId}`, { title });

export const patchQuestionRequest = (questionId, data) =>
  instance.patch(`/questions/${questionId}`, data);
export const deleteQuestionRequest = (questionId) =>
  instance.delete(`/questions/${questionId}`);

export const deleteAnswerRequest = (answerId) =>
  instance.delete(`/answers/${answerId}`);
export const patchAnswerRequest = (answerId, data) =>
  instance.patch(`/answers/${answerId}`, data);
