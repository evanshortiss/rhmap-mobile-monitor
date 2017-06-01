import * as React from 'react';
import { render } from 'react-dom'
import { Router, Redirect, Route, Link } from 'react-router';
import { Provider } from 'react-redux';
import history = require('../history-engine');
import store from '../store';

import App from './App';
import Loader from './Loader';
import EnvironmentView from './Environment';
import FeedView from './Feed';
import { LoginView } from './Login';

export class Root extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <Loader/>
        <Router history={history}>
          <Route component={App}>
            <Redirect from="/" to="/login"/>
            <Route path="environments" component={EnvironmentView}/>
            <Route path="newsfeed" component={FeedView}/>
            <Route path="login" component={LoginView}/>
          </Route>
        </Router>
      </div>
    );
  }
}
