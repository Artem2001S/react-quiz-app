import { takeLatest } from 'redux-saga/effects';
import { deleteAnswer, fetchTest, patchTest } from '../currentTestSlice';
import { deleteAnswerWorker } from './answerWorkers';
import { fetchTestWorker, patchTestWorker } from './testWorkers';

export function* watchCurrentTest() {
  yield takeLatest(fetchTest.type, fetchTestWorker);
  yield takeLatest(patchTest.type, patchTestWorker);

  yield takeLatest(deleteAnswer.type, deleteAnswerWorker);
}
