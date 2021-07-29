import { takeLatest } from 'redux-saga/effects';
import {
  deleteAnswer,
  deleteQuestion,
  fetchTest,
  patchAnswer,
  patchQuestion,
  patchTest,
} from '../currentTestSlice';
import { deleteAnswerWorker, patchAnswerWorker } from './answerWorkers';
import { deleteQuestionWorker, patchQuestionWorker } from './questionWorkers';
import { fetchTestWorker, patchTestWorker } from './testWorkers';

export function* watchCurrentTest() {
  yield takeLatest(fetchTest.type, fetchTestWorker);
  yield takeLatest(patchTest.type, patchTestWorker);

  yield takeLatest(patchQuestion.type, patchQuestionWorker);
  yield takeLatest(deleteQuestion.type, deleteQuestionWorker);

  yield takeLatest(deleteAnswer.type, deleteAnswerWorker);
  yield takeLatest(patchAnswer.type, patchAnswerWorker);
}
