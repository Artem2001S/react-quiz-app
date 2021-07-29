import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
  messageReceived,
} from 'redux/userInterface/userInterfaceSlice';
import { answerDeleted } from '../currentTestSlice';
import { deleteAnswerRequest } from '../requests';

export function* deleteAnswerWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { answerId, questionId } = payload;

    yield call(deleteAnswerRequest, answerId);
    yield put(answerDeleted({ answerId, questionId }));
  } catch (error) {
    yield put(messageReceived({ message: 'Answer deleting server error' }));
  } finally {
    yield put(loadingFinished());
  }
}
