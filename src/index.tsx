import * as React from 'react';
import { render } from 'react-dom'
import { Router, Redirect, Route, Link } from 'react-router';
import { Provider } from 'react-redux';
import history = require('./history-engine');
import store from './store';

import { Root } from './components/Root';

render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('sync-redux-app')
);
