import { SELECT_ENTRIES_STATUS } from '../constants/actionTypes';
import { ALL } from '../constants/entriesStatuses';
import { createReducer } from './helpers';

function selectStatus(state, action) {
  return action.status;
}

const selectedStatusTab = createReducer(ALL, {
  [SELECT_ENTRIES_STATUS]: selectStatus
});

export default selectedStatusTab;

/* SELECTORS */

export function getSelectedStatusTab(state) {
  return state.ui.selectedStatusTab;
}
