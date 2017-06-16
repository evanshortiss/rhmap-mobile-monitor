import * as React from 'react';
import { dismissKeyboard } from '../util';
import * as auth from '../auth';
import * as sync from '../sync';
import * as la from '../actions/loader';
import { connect } from 'react-redux';
import { setUser, setEnvironment } from '../actions/config';
import { GlobalState } from '../interfaces/global';
import store from '../store';
import historyEngine = require('../history-engine');

interface LoginViewState {
  username: string
  password: string
}

interface LoginViewProps {
  environments: Array<string>
}

class LoginView extends React.Component <LoginViewProps, LoginViewState> {
  constructor () {
    super()

    this.state = {
      username: '',
      password: ''
    };
  }

  doLogin (e: any) {
    const self = this;

    e.preventDefault();

    // If user pressed "enter" the keyboard/cursor might stay active on mobile
    // This hacky function will ensure it gets dismissed
    dismissKeyboard();

    const { username, password } = this.state;

    store.dispatch(la.showLoading(`Login ${username}`));

    auth.performFhAuth(username, password)
      .then(() => store.dispatch(setUser(username)))
      .then(() => store.dispatch(la.updateMessage('Initialising user session')))
      .then(() => sync.init([{name: 'resources'}, {name: 'newsfeed'}, {name: 'userprefs'}], username))
      .then(() => store.dispatch(setEnvironment(self.props.environments[0])))
      .then(() => historyEngine.push('/environments'))
      .catch((e) => {
        console.log(e.stack);
        alert('Login failed. ' + e.toString());
      })
      .finally(() => store.dispatch(la.hideLoading()));
  }

  render() {
    return (
      <div className="login">
        <form className="ui form" onSubmit={(e) => { this.doLogin(e) }}>
          <div className="field">
            <h3>Username</h3>
            <input
              type="email"
              required
              value={this.state.username}
              onChange={(e) => { this.setState({username: e.target.value}) }}
              name="username"
              placeholder="you@acme.com"/>
          </div>
          <div className="field">
            <h3>Password</h3>
            <input
              type="password"
              required
              value={this.state.password}
              onChange={(e) => { this.setState({password: e.target.value}) }}
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


function mapStateToProps ( state: GlobalState ): LoginViewProps {
  return {
    environments: Object.keys(state.resources.records)
  }
}

export default connect(mapStateToProps)(LoginView);
