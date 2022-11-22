import {combineReducers} from 'redux';

import userReducer from './userReducer';
import loginReducer from './loginReducer';
import innReducer from './innReducer';
import logisticReducer from './logisticReducer';
import roommateReducer from './roommateReducer';
import {housewareReducer} from './housewareReducer';
import {globalReducer} from './globalReducer';
import messageReducer from './messageReducer';

const allReducers = combineReducers({
  userReducer,
  loginReducer,
  innReducer,
  logisticReducer,
  roommateReducer,
  housewareReducer,
  globalReducer,
  messageReducer,
});

export default allReducers;
