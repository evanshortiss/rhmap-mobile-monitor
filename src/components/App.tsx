import * as React from 'react';
import { deviceIsIos } from '../util'
import { Provider } from 'react-redux';
import store from '../store';
import Header from './Header';
import Menu from './Menu';

export default class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div>
        <Header/>
        <Menu/>
        <div className={"app-container" + (deviceIsIos() ? ' ios' : '')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
