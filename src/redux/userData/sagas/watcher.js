import { takeLatest } from 'redux-saga/effects';
import { userLogin } from '../userDataSlice';
import { userLoginWorker } from './workers';

export function* watchUser() {
  yield takeLatest(userLogin.type, userLoginWorker);
}
