
declare var $fh: any;

import Promise = require('bluebird');
import store from '../store';

import * as sda from '../actions/sync-dataset';
import * as sa from '../actions/sync';
import * as la from '../actions/loader';

export function init (datasets: Array<{ name: string, frequency?: string }>, username: string) {

  store.dispatch(
    la.showLoading('Initialising data synchronisation')
  );

  $fh.sync.init({
    sync_frequency: 60,
    storage_strategy: 'dom'
  });

  return new Promise(function (resolve, reject) {
    const completedSyncDatasets: {[key:string]: boolean} = {};

    $fh.sync.notify((e: any) => {
      switch(e.code) {
        case 'sync_started':
          // if the global loader is visible, then show a relevant message
          store.dispatch(la.updateMessage('Syncing data from the cloud'));
          // make sure the top right spinner is active
          store.dispatch(sa.syncStarted());
          break;
        case 'sync_failed':
          store.dispatch(sa.syncFailed());
          reject(new Error('sync initialisation failed'));
          break;
        case 'sync_complete':
          onSyncComplete(e.dataset_id);

          // Mark sync for this dataset as completed
          completedSyncDatasets[e.dataset_id] = true;

          // After all datasets have synced at least once then we can resolve
          if (Object.keys(completedSyncDatasets).length === datasets.length) {
            resolve();
          }

          break;
      }
    });


    // Setup our sync loop for each dataset our application requires
    datasets.forEach((d => {
      // TODO: callbacks, meta, query
      $fh.sync.manage(d.name, {
        sync_frequency: d.frequency || 30
      }, {
        username: username
      }, {}, function () {
        console.log(d.name + ' is now managed by sync');
      });
    }));

  });


  /**
   * Each time a sync completes this function will be called.
   * It triggers an action that will in turn load the latest data into stores.
   */
  function onSyncComplete (dataset: string) {
    datasets.forEach((d) => {
      // Refresh each dataset in the store with latest from sync framework
      sda.loadDataset(store.dispatch, store.getState, {
        dataset: d.name
      })
    });

    store.dispatch(sda.syncRefreshed(dataset));
    store.dispatch(sa.syncComplete());
  }
}
