import * as React from 'react';
import { deviceIsIos } from '../util'
import { Provider } from 'react-redux';
import store from '../store';
import Header from './Header';

export default class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <Header/>
        <div className={"app-container" + (deviceIsIos() ? ' ios' : '')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
