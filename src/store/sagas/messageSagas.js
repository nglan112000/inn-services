import {put} from 'redux-saga/effects';
import { setChangeMessage } from '../actions/messageAction';

export function* watchMessage({type, payload}) {
  const data = payload.map(item => {
    return {
      [item.doc.id]: {
        id: item.doc.id,
        ...item.doc.data(),
      },
    };
  });
  yield put(setChangeMessage(data));
}
