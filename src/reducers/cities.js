import {
  REQUEST_CITIES,
  RECEIVE_CITIES,
  FAILURE_CITIES
} from '../constants/actionTypes';

import { combineReducers } from 'redux';
import { createReducer } from './helpers';

function copyItems(state, action) {
  return [...action.items];
}

const allItems = createReducer([], {
  [RECEIVE_CITIES]: copyItems
});

const isFetching = createReducer(false, {
  [RECEIVE_CITIES]: () => false,
  [REQUEST_CITIES]: () => true,
  [FAILURE_CITIES]: () => false
});

function _lastFetchAt(state, action) {
  return action.lastFetchAt.getTime();
}

const lastFetchAt = createReducer(null, {
  [RECEIVE_CITIES]: _lastFetchAt,
  [FAILURE_CITIES]: _lastFetchAt
});

export default combineReducers({
  allItems,
  isFetching,
  lastFetchAt
});

/* SELECTORS */

export function getLastFetchAt(state) {
  return state.entities.cities.lastFetchAt;
}

export function getIsFetching(state) {
  return state.entities.cities.isFetching;
}

export function getItems(state) {
  return state.entities.cities.allItems;
}
