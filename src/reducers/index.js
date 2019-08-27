import { combineReducers } from 'redux';
import currentWeather from './currentWeather';
import { reducer as modal } from 'redux-modal';
import cities from './cities';

const entities = combineReducers({
  currentWeather,
  cities
});

const rootReducer = combineReducers({
  entities,
  modal
});

export default rootReducer;
