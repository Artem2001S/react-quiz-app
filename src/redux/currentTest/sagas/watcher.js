import { takeLatest } from 'redux-saga/effects';
import {
  deleteAnswer,
  fetchTest,
  patchAnswer,
  patchTest,
} from '../currentTestSlice';
import { deleteAnswerWorker, patchAnswerWorker } from './answerWorkers';
import { fetchTestWorker, patchTestWorker } from './testWorkers';

export function* watchCurrentTest() {
  yield takeLatest(fetchTest.type, fetchTestWorker);
  yield takeLatest(patchTest.type, patchTestWorker);

  yield takeLatest(deleteAnswer.type, deleteAnswerWorker);
  yield takeLatest(patchAnswer.type, patchAnswerWorker);
}
