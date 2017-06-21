
import * as React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';

import store from './store';
import { Root } from './components/root';

// This removes the click delay from certain device webviews
// Details are here - https://github.com/ftlabs/fastclick
import * as fastclick from 'fastclick';
fastclick(document.body);

render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('sync-redux-app')
);
