
import {
  SYNC_STARTED,
  SYNC_COMPLETE,
  SYNC_FAILED
} from '../actions/sync';

import {
  SyncState,
  SyncAction
} from '../interfaces/sync';

const defaultState: SyncState = {
  isSyncing: false
};

export default function loadingReducer (state: SyncState = defaultState, action: SyncAction): SyncState {
  switch (action.type) {
    case SYNC_STARTED:
      return {
        isSyncing: true,
        lastCompleteTs: state.lastCompleteTs,
        lastFailTs: state.lastFailTs
      };
    case SYNC_COMPLETE:
      return {
        isSyncing: false,
        lastCompleteTs: new Date(),
        lastFailTs: state.lastFailTs
      };
    case SYNC_FAILED:
      return {
        isSyncing: true,
        lastCompleteTs: state.lastCompleteTs,
        lastFailTs: new Date()
      };
    default:
      return defaultState;
  }
}
