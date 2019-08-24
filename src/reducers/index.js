import { combineReducers } from 'redux';
import { FETCH_FAILURE } from '../constants/actionTypes';
import currentWeather from './currentWeather';
import { reducer as modal } from 'redux-modal';

const entities = combineReducers({
  currentWeather
});

function errorMessage(state = null, { type, error }) {
  switch (type) {
    case FETCH_FAILURE:
      return error;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  entities,
  errorMessage,
  modal
});

export default rootReducer;
