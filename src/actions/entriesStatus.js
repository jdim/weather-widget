import { SELECT_ENTRIES_STATUS } from '../constants/actionTypes';

/* Only status for tabs(entries table). For particular entry status see currentWeather actions */
export function selectStatus(status) {
  return {
    type: SELECT_ENTRIES_STATUS,
    status
  };
}
