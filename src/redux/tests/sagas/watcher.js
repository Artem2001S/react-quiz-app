import { takeLatest } from 'redux-saga/effects';
import { createNewTest, fetchTests } from '../testsSlice';
import { createNewTestWorker, fetchTestsWorker } from './workers';

export function* watchTests() {
  yield takeLatest(fetchTests.type, fetchTestsWorker);
  yield takeLatest(createNewTest.type, createNewTestWorker);
}
