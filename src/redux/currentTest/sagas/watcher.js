import { takeLatest } from 'redux-saga/effects';
import {
  changeAnswerPosition,
  deleteAnswer,
  deleteQuestion,
  fetchTest,
  patchAnswer,
  patchQuestion,
  patchTest,
  postAnswer,
  postQuestion,
} from '../currentTestSlice';
import {
  changeAnswerPositionWorker,
  deleteAnswerWorker,
  patchAnswerWorker,
  postAnswerWorker,
} from './answerWorkers';
import {
  deleteQuestionWorker,
  patchQuestionWorker,
  postQuestionWorker,
} from './questionWorkers';
import { fetchTestWorker, patchTestWorker } from './testWorkers';

export function* watchCurrentTest() {
  yield takeLatest(fetchTest.type, fetchTestWorker);
  yield takeLatest(patchTest.type, patchTestWorker);

  yield takeLatest(patchQuestion.type, patchQuestionWorker);
  yield takeLatest(deleteQuestion.type, deleteQuestionWorker);
  yield takeLatest(postQuestion.type, postQuestionWorker);

  yield takeLatest(deleteAnswer.type, deleteAnswerWorker);
  yield takeLatest(patchAnswer.type, patchAnswerWorker);
  yield takeLatest(postAnswer.type, postAnswerWorker);
  yield takeLatest(changeAnswerPosition.type, changeAnswerPositionWorker);
}
