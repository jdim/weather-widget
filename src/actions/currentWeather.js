import {
  REQUEST_CURRENT_WEATHER,
  RECEIVE_CURRENT_WEATHER,
  FETCH_FAILURE,
  UPDATE_CURRENT_WEATHER_ENTRY,
  MOVE_CURRENT_WEATHER
} from '../constants/actionTypes';

import { getByCityName } from '../api/currentWeather';

function requestCurrentWeather() {
  return {
    type: REQUEST_CURRENT_WEATHER
  };
}

function receiveCurrentWeather(data) {
  return {
    data,
    type: RECEIVE_CURRENT_WEATHER
  };
}

function fetchFailure(error) {
  return {
    error,
    type: FETCH_FAILURE
  };
}

export function fetchCurrentWeather(city) {
  return function(dispatch) {
    dispatch(requestCurrentWeather());
    getByCityName(city)
      .then(data => dispatch(receiveCurrentWeather(data)))
      .catch(err => dispatch(fetchFailure(err)));
  };
}

export function updateEntry(id, data) {
  return {
    type: UPDATE_CURRENT_WEATHER_ENTRY,
    id,
    data
  };
}

export function moveEntry(id, direction) {
  return {
    type: MOVE_CURRENT_WEATHER,
    direction,
    id
  };
}
