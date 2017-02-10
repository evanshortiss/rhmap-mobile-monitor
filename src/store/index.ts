import { createStore, applyMiddleware } from 'redux';
import thunk = require('redux-thunk');
import createLogger = require('redux-logger')
import reducers from '../reducers';

export default createStore(
  reducers,
  applyMiddleware(thunk.default, createLogger())
);
