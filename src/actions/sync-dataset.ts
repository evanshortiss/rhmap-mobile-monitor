
declare var $fh: any;

import { ThunkAction } from 'redux-thunk';
import Promise = require('bluebird');

export const SYNC_UPDATE_RECORD = 'SYNC_UPDATE_RECROD';
export const updateRecord: ThunkAction <void, void, {dataset: string, guid: string, record: Object}> =
(dispatch, getState, args) => {
    return $fh.sync.doUpdate(args.dataset, args.guid, args.record)
      .then(() => dispatch({
        type: SYNC_UPDATE_RECORD,
        payload: {
          dataset: args.dataset,
          guid: args.guid,
          record: args.record
        }
      }));
  };

export const SYNC_LOAD_DATASET = 'SYNC_LOAD_DATASET';
export const loadDataset: ThunkAction <void, void, { dataset: string }> =
(dispatch, getState, args) => {
  return new Promise((resolve, reject) => {
    $fh.sync.doList(args.dataset, (data: Object) => {
      dispatch({
        type: SYNC_LOAD_DATASET,
        payload: {
          dataset: args.dataset,
          records: data
        }
      })
      resolve();
    }, reject)
  });
}

export const SYNC_REFRESHED = 'SYNC_REFRESHED';
export function syncRefreshed (dataset: string, ts?: Date) {
  return {
    type: SYNC_REFRESHED,
    payload: {
      dataset: dataset,
      lastRefreshTs: ts || new Date()
    }
  }
}

export const SYNC_CREATE_RECORD = 'SYNC_CREATE_RECORD';
export const createRecord: ThunkAction <void, void, { dataset: string, record: Object }> =
(dispatch, getState, args) => {
  return $fh.sync.doCreate(args.dataset, args.record)
    .then((res: {guid: string, data: Object}) => dispatch({
      type: SYNC_CREATE_RECORD,
      payload: {
        dataset: args.dataset,
        guid: res.guid,
        record: res.data
      }
    }));
}
