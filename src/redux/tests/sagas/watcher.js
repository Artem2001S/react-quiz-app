import { takeLatest } from 'redux-saga/effects';
import { createNewTest, deleteTest, fetchTests } from '../testsSlice';
import {
  createNewTestWorker,
  deleteTestWorker,
  fetchTestsWorker,
} from './workers';

export function* watchTests() {
  yield takeLatest(fetchTests.type, fetchTestsWorker);
  yield takeLatest(createNewTest.type, createNewTestWorker);
  yield takeLatest(deleteTest.type, deleteTestWorker);
}
