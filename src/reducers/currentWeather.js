import { combineReducers } from 'redux';
import {
  REQUEST_CURRENT_WEATHER,
  RECEIVE_CURRENT_WEATHER,
  FAILURE_CURRENT_WEATHER,
  UPDATE_CURRENT_WEATHER_ENTRY,
  MOVE_CURRENT_WEATHER
} from '../constants/actionTypes';
import { createReducer } from './helpers';
import { ALL } from '../constants/entriesStatuses';
import { UP, DOWN } from '../constants/moveDirections';

function insertItem(state, action) {
  const { data: newItem } = action;
  if (state.hasOwnProperty(newItem.id)) {
    return { ...state };
  }
  return { ...state, [newItem.id]: { ...newItem } };
}

function updateItem(state, action) {
  const { id, data } = action;
  return { ...state, [id]: { ...state[id], ...data } };
}

function insertItemId(state, action) {
  const newId = action.data.id;
  if (state.indexOf(newId) > -1) {
    return [...state];
  }
  return [...state, action.data.id];
}

function moveItemId(state, action) {
  const position = state.indexOf(action.id);
  const first = position === 0;
  const last = position === state.length - 1;

  if (action.direction === UP && !first) {
    return [
      ...state.slice(0, position - 1),
      state[position],
      state[position - 1],
      ...state.slice(position + 1)
    ];
  } else if (action.direction === DOWN && !last) {
    return [
      ...state.slice(0, position),
      state[position + 1],
      state[position],
      ...state.slice(position + 2)
    ];
  } else {
    return state;
  }
}

const byId = createReducer(
  {},
  {
    [RECEIVE_CURRENT_WEATHER]: insertItem,
    [UPDATE_CURRENT_WEATHER_ENTRY]: updateItem
  }
);

const allIds = createReducer([], {
  [RECEIVE_CURRENT_WEATHER]: insertItemId,
  [MOVE_CURRENT_WEATHER]: moveItemId
});

const isFetching = createReducer(false, {
  [REQUEST_CURRENT_WEATHER]: () => true,
  [RECEIVE_CURRENT_WEATHER]: () => false,
  [FAILURE_CURRENT_WEATHER]: () => false
});

const error = createReducer(null, {
  [FAILURE_CURRENT_WEATHER]: getError,
  [REQUEST_CURRENT_WEATHER]: () => null,
  [RECEIVE_CURRENT_WEATHER]: () => null
});

function getError(state, { error }) {
  return error;
}

export default combineReducers({
  byId,
  allIds,
  isFetching,
  error
});

/* SELECTORS */

export function getItems(state, selectedStatus) {
  const { currentWeather: entity } = state.entities;
  return entity.allIds
    .map(id => entity.byId[id])
    .filter(
      ({ status }) => selectedStatus === ALL || status === selectedStatus
    );
}

export function getIsFetching(state) {
  return state.entities.currentWeather.isFetching;
}

export function getById(state, id) {
  return state.entities.currentWeather.byId[id];
}

export function getErrorMessage(state) {
  const { error } = state.entities.currentWeather;
  return error ? error.message : '';
}
