import { deviceIsIos } from '../util';
import * as React from 'react';
import { connect } from 'react-redux';
import { HeaderProps } from '../interfaces/views';
import { GlobalState } from '../interfaces/global';

class Header extends React.Component <HeaderProps, undefined> {
  render() {

    const menuHidden = !this.props.menuVisible;
    const hideSpinner = !this.props.syncing;

    let titleClasses = [
      'title',
      menuHidden ? 'thirteen' : 'eleven',
      'wide column no-padding'
    ];

    return (
      <div className={'app-header ui padded grid ' + (deviceIsIos() ? 'ios' : '')}>
        <div
          style={{margin: 'auto', paddingLeft: '3vw !important', fontSize: '1.5em'}}
          className={'two wide column colors rh-white ' + (menuHidden ? 'hidden' : '')}>
          <i className="content icon"></i>
        </div>
        <div className={titleClasses.join(' ')}>
          <img src="img/logo.png"/>
        </div>
        <div className="three wide column no-padding">
          <div className={'sk-circle ' + (hideSpinner ? 'hidden': '')}>
            <div className="sk-circle1 sk-child"></div>
            <div className="sk-circle2 sk-child"></div>
            <div className="sk-circle3 sk-child"></div>
            <div className="sk-circle4 sk-child"></div>
            <div className="sk-circle5 sk-child"></div>
            <div className="sk-circle6 sk-child"></div>
            <div className="sk-circle7 sk-child"></div>
            <div className="sk-circle8 sk-child"></div>
            <div className="sk-circle9 sk-child"></div>
            <div className="sk-circle10 sk-child"></div>
            <div className="sk-circle11 sk-child"></div>
            <div className="sk-circle12 sk-child"></div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps( state: GlobalState ): HeaderProps {
  return {
    // Menu is only visible once resources are present (app is loaded)
    // Not the best way to check, but this is early days so...
    menuVisible: Object.keys(state.resources.records).length !== 0,
    syncing: state.sync.isSyncing
  };
}

export default connect(mapStateToProps)(Header);
