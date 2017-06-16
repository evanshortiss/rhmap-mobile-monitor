
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk = require('redux-thunk');
import createLogger = require('redux-logger');

import resources from '../reducers/resources-sync';
import newsfeed from '../reducers/newsfeed-sync';
import userprefs from '../reducers/userprefs';
import loader from '../reducers/loader';
import sync from '../reducers/sync';
import menu from '../reducers/menu';
import config from '../reducers/config';

export default createStore(
  combineReducers({
    // Custom reducers
    resources,
    newsfeed,
    userprefs,
    loader,
    sync,
    menu,
    config,

    routing: routerReducer
  }),
  applyMiddleware(thunk.default, createLogger())
);

