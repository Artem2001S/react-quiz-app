import { call, put } from 'redux-saga/effects';
import {
  loadingFinished,
  loadingStarted,
  messageReceived,
} from 'redux/userInterface/userInterfaceSlice';
import { answerDeleted, answerUpdated } from '../currentTestSlice';
import { deleteAnswerRequest, patchAnswerRequest } from '../requests';

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

export function* patchAnswerWorker({ payload }) {
  try {
    yield put(loadingStarted());
    const { answerId, is_right, text } = payload;
    yield call(patchAnswerRequest, answerId, { is_right, text });

    yield put(answerUpdated({ answerId, changes: { is_right } }));
  } catch (error) {
    yield put(messageReceived({ message: 'Answer patching server error' }));
  } finally {
    yield put(loadingFinished());
  }
}
