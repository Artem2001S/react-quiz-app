import { takeLatest } from 'redux-saga/effects';
import { checkIsAuthorized, userLogin } from '../userDataSlice';
import { checkIsAuthorizedWorker, userLoginWorker } from './workers';

export function* watchUser() {
  yield takeLatest(userLogin.type, userLoginWorker);
  yield takeLatest(checkIsAuthorized.type, checkIsAuthorizedWorker);
}
