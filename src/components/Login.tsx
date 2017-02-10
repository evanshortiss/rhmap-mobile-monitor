import * as React from 'react';
import * as util from '../util';
import * as auth from '../auth';
import * as sync from '../sync';
import * as la from '../actions/loader';

import store from '../store';
import historyEngine = require('../history-engine');

import { LoginViewState } from '../interfaces/views';

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class LoginView extends React.Component <undefined, LoginViewState> {
  constructor () {
    super()

    this.state = {
      loginEnabled: false,
      username: '',
      password: ''
    };
  }
  doLogin (e: any) {
    e.preventDefault();

    // If user pressed "enter" the keyboard/cursor might stay active on mobile
    util.dismissKeyboard();

    const { username, password } = this.state;

    store.dispatch(la.showLoading(`Login ${username}`));

    auth.performFhAuth(username, password)
      .then(() => store.dispatch(la.updateMessage('Initialising user session')))
      .then(() => sync.init([{name: 'resources'}], username))
      .then(() => historyEngine.push('/environments'))
      .catch((e) => {
        alert('Login failed. ' + e.toString());
      })
      .finally(() => store.dispatch(la.hideLoading()));
  }
  onUsernameChange(e: any) { // TODO - should type these correctly...
    this.setState({username: e.target.value} as LoginViewState);
  }
  onPasswordChange(e: any) {
    this.setState({password: e.target.value} as LoginViewState);
  }
  render() {
    return (
      <div className="login">
        <form className="ui form" onSubmit={this.doLogin.bind(this)}>
          <div className="field">
            <h3>Username</h3>
            <input
              type="email"
              required
              value={this.state.username}
              onChange={this.onUsernameChange.bind(this)}
              name="username"
              placeholder="you@acme.com"/>
          </div>
          <div className="field">
            <h3>Password</h3>
            <input
              type="password"
              required
              value={this.state.password}
              onChange={this.onPasswordChange.bind(this)}
              name="password"/>
          </div>
          <div className="centered">
            <button className="ui button" type="submit">
              <h3>LOGIN</h3>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
