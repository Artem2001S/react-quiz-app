import { takeLatest } from 'redux-saga/effects';
import { checkIsAuthorized, userLogin, userLogout } from '../userDataSlice';
import {
  checkIsAuthorizedWorker,
  userLoginWorker,
  userLogoutWorker,
} from './workers';

export function* watchUser() {
  yield takeLatest(userLogin.type, userLoginWorker);
  yield takeLatest(checkIsAuthorized.type, checkIsAuthorizedWorker);
  yield takeLatest(userLogout.type, userLogoutWorker);
}
