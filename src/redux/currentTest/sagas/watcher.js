import { takeLatest } from 'redux-saga/effects';
import { fetchTest, patchTest } from '../currentTestSlice';
import { fetchTestWorker, patchTestWorker } from './workers';

export function* watchCurrentTest() {
  yield takeLatest(fetchTest.type, fetchTestWorker);
  yield takeLatest(patchTest.type, patchTestWorker);
}
