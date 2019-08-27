import {
  REQUEST_CITIES,
  RECEIVE_CITIES,
  FAILURE_CITIES
} from '../constants/actionTypes';

import { getCities } from '../api/citiesApi';

function requestCities() {
  return {
    type: REQUEST_CITIES
  };
}

function receiveCities(items) {
  return {
    type: RECEIVE_CITIES,
    items,
    lastFetchAt: new Date()
  };
}

function failureCities() {
  return {
    type: FAILURE_CITIES,
    lastFetchAt: new Date()
  };
}

export function fetchCities() {
  return function(dispatch) {
    dispatch(requestCities);
    getCities()
      .then(items => dispatch(receiveCities(items)))
      .catch(err => failureCities);
  };
}
