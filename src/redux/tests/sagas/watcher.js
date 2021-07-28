import { takeLatest } from 'redux-saga/effects';
import { fetchTests } from '../testsSlice';
import { fetchTestsWorker } from './workers';

export function* watchTests() {
  yield takeLatest(fetchTests.type, fetchTestsWorker);
}
