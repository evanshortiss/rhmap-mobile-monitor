import { deviceIsIos } from '../util';
import * as actions from '../actions/menu';
import store from '../store';
import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../interfaces/global';
import he = require('../history-engine');
import EnvironmentSelector from './environment-selector';

export interface HeaderProps {
  showMenuIcon: boolean
  menuIsOpen: boolean
  showBackIcon: boolean
}

class Header extends React.Component <HeaderProps, undefined> {
  openMenu () {
    store.dispatch(actions.toggleMenu());
  }

  render() {
    const menuIconHidden = !this.props.showMenuIcon && !this.props.showBackIcon;

    // Left side of the header, will contain an icon if visible
    const icon = this.props.showBackIcon ? 'chevron left' : 'content';
    const clickFn = this.props.showBackIcon ? he.goBack : this.openMenu;
    const left = (
      <div
        onClick={clickFn}
        style={{margin: 'auto', paddingLeft: '3vw !important', fontSize: '1.5em'}}
        className={'two wide column colors rh-white ' + (menuIconHidden ? 'hidden' : '')}>
        <i className={icon + " icon menu-icon " + (this.props.menuIsOpen ? 'active' : '')}></i>
      </div>
    );

    // Middle of the header. Contains the RHMAP logo
    const rhmapLogoWidth = menuIconHidden ? 'thirteen' : 'nine';
    const middle = (
      <div className={`title ${rhmapLogoWidth} wide column no-padding`}>
        <img src="img/logo.png"/>
      </div>
    );

    // Right hand side of the header contains the environment selector
    const right = (
      <div className="five wide column no-padding">
        <EnvironmentSelector/>
      </div>
    );

    return (
      <div className={'app-header ui padded grid ' + (deviceIsIos() ? 'ios' : '')}>
        {left}
        {middle}
        {right}
      </div>
    );
  }
}

function mapStateToProps ( state: GlobalState ): HeaderProps {
  const isNested = he.getCurrentLocation().pathname.split('/').length === 3
  return {
    // Menu is only visible once resources are present (app is loaded)
    // Not the most elegant check, but this is not mission critical so...
    showMenuIcon: !isNested && Object.keys(state.resources.records).length !== 0,
    showBackIcon: isNested,
    menuIsOpen: state.menu.visible,
  } as HeaderProps;
}

export default connect(mapStateToProps)(Header);
