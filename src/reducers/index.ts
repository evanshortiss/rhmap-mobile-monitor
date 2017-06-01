
import { combineReducers } from 'redux';

import resources from './resources-sync';
import newsfeed from './newsfeed-sync';
import loader from './loader';
import sync from './sync';
import menu from './menu';

// This will be a global store for now. It will look like:
// {
//    resources: { sync dataset items here }
//    loader: { loader message and visible boolean }
//    sync: { the overall sync state. tracks last sync time and if a sync is in progress }
// }
// Should create an interface for this probably
export default combineReducers({
  menu,
  resources,
  newsfeed,
  loader,
  sync
});
