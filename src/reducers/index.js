import { combineReducers } from 'redux';
import currentWeather from './currentWeather';
import { reducer as modal } from 'redux-modal';

const entities = combineReducers({
  currentWeather
});

const rootReducer = combineReducers({
  entities,
  modal
});

export default rootReducer;
