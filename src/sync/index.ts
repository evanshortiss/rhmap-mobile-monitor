
declare var $fh: any;

import Promise = require('bluebird');
import store from '../store';

import * as sda from '../actions/sync-dataset';
import * as sa from '../actions/sync';
import * as la from '../actions/loader';


export function init (datasets: Array<{ name: string }>, username: string) {

  store.dispatch(
    la.showLoading('Initialising data synchronisation')
  );

  $fh.sync.init({
    sync_frequency: 60,
    storage_strategy: 'dom'
  });

  return new Promise(function (resolve, reject) {

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
          onSyncComplete();
          if (e.dataset_id === 'resources') {
            // After first "resources" sync completes we can consider the sync
            // initialisation completed. Calling this resolve many times has no
            //side effect (yay promises?), but maybe this could be cleaner
            resolve();
          }
          break;
      }
    });


    // Setup our sync loop for each dataset our application requires
    datasets.forEach((d => {
      // TODO: callbacks, meta, query
      $fh.sync.manage(d.name, {}, {
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
  function onSyncComplete () {
    datasets.forEach((d) => {
      // Refresh the dataset in the store with latest from sync framework
      sda.loadDataset(store.dispatch, store.getState, {
        dataset: d.name
      })
    });

    store.dispatch(sda.syncRefreshed());
    store.dispatch(sa.syncComplete());
  }
}
