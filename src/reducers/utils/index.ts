
import {
  SYNC_LOAD_DATASET,
  SYNC_UPDATE_RECORD,
  SYNC_REFRESHED,
  SYNC_CREATE_RECORD
} from '../../actions/sync-dataset';

import {
  SyncDatasetState,
  SyncDatasetAction
} from '../../interfaces/sync';


/**
 * We're probably going to end up syncing a few different datasets so we should
 * create a generic sync dataset reducer that can be reused for each dataset.
 */
export function createSyncReducer (dataset: string) {
  const defaultState = {
    records: {}
  };

  return function (state: SyncDatasetState = defaultState, action: SyncDatasetAction): SyncDatasetState {
    const payload = action.payload;

    // This is designed to be a generic sync dataset reducer, but it should
    // only reduce the dataset assigned to it, so skip reducing if another
    // dataset is responsible for triggering this action!
    // Is this nasty stuff in redux land?
    if (action.payload && action.payload.dataset !== dataset) {
      return state;
    }

    switch (action.type) {
      case SYNC_LOAD_DATASET:
        return {
          records: payload.records
        };
      case SYNC_UPDATE_RECORD:
        state.records[payload.guid] = payload.record;
        return state;
      case SYNC_CREATE_RECORD:
        state.records[payload.guid] = payload.record;
        return state;
      case SYNC_REFRESHED:
        state.lastRefreshTs = payload.lastRefreshTs;
        return state;
      default:
        return state;
    }
  };
}
