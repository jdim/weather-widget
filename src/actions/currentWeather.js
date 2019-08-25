import {
  REQUEST_CURRENT_WEATHER,
  RECEIVE_CURRENT_WEATHER,
  FAILURE_CURRENT_WEATHER,
  UPDATE_CURRENT_WEATHER_ENTRY,
  MOVE_CURRENT_WEATHER
} from '../constants/actionTypes';
import { errorPayload } from './helpers';

import { getByCityName } from '../api/currentWeather';
import { getById } from '../reducers/currentWeather';

function requestCurrentWeather() {
  return {
    type: REQUEST_CURRENT_WEATHER
  };
}

function receiveCurrentWeather(data) {
  return function(dispatch, getState) {
    const state = getState();
    const existsItem = getById(state, data.id);
    if (existsItem) {
      dispatch(
        failureCurrentWeather(
          errorPayload({
            message: `Item from this source already exists. Checkout "${existsItem.city}" in table`
          })
        )
      );
      return;
    }
    dispatch({
      type: RECEIVE_CURRENT_WEATHER,
      data
    });
  };
}

function failureCurrentWeather(error) {
  return {
    error,
    type: FAILURE_CURRENT_WEATHER
  };
}

export function fetchCurrentWeather(city) {
  return function(dispatch) {
    dispatch(requestCurrentWeather());
    getByCityName(city)
      .then(data => dispatch(receiveCurrentWeather(data)))
      .catch(err => dispatch(failureCurrentWeather(err)));
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
