
import * as React from 'react';
import { Router, Route, Redirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import history = require('../history-engine');
import store from '../store';

import App from '../views/app';
import Loader from '../views/loader';
import EnvironmentView from '../views/environment';
import FeedView from '../views/feed';
import LoginView from '../views/login';
import CloudAppsView from '../views/cloud-applications';
import Menu from '../views/menu';
import CloudAppDetailView from '../views/cloud-application-details';

export class Root extends React.Component<undefined, undefined> {
  render () {
    return (
      <div>
        <Loader/>
        <Menu/>
        <Router history={syncHistoryWithStore(history, store)}>
          <Route component={App}>
            <Redirect from='/' to='/login'/>
            <Route path='environments' component={EnvironmentView}/>
            <Route path='newsfeed' component={FeedView}/>
            <Route path='login' component={LoginView}/>
            <Route path='cloud-apps' component={CloudAppsView}/>
            <Route path='cloud-apps/:guid' component={CloudAppDetailView}/>
          </Route>
        </Router>
      </div>
    );
  }
}
