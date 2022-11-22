import {CHANGE_MESSAGE, SET_CHANGE_MESSAGES} from './types';

export const changeMessage = payload => {
  return {type: CHANGE_MESSAGE, payload: payload};
};

export const setChangeMessage = (payload) => {
  return {type: SET_CHANGE_MESSAGES, payload: payload}
}