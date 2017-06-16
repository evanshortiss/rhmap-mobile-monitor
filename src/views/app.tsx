import * as React from 'react';
import { deviceIsIos } from '../util'
import { Provider } from 'react-redux';
import store from '../store';
import Header from '../components/header';

export default class App extends React.Component<void, void> {
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
