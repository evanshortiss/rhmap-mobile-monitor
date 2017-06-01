import { deviceIsIos } from '../util';
import * as actions from '../actions/menu';
import * as React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import store from '../store';
import { MenuComponentProps } from '../interfaces/menu';
import { GlobalState } from '../interfaces/global';
import historyEngine = require('../history-engine');
import ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Menu extends React.Component <MenuComponentProps, undefined> {
  navigateTo (page: string) {
    historyEngine.push(page);
    store.dispatch(actions.hideMenu());
  }

  render () {
    const menu = (
      <div className="menu colors rh-lighter-grey bg">
        <ul>
          <li onClick={() => this.navigateTo('/environments')}><i className="dashboard icon"></i> Resource Usage</li>
          <li onClick={() => this.navigateTo('/newsfeed')}><i className="feed icon"></i> Status Reports</li>
        </ul>
      </div>
    );

    return (
      <ReactCSSTransitionGroup
        transitionName="menu"
        transitionAppear={true}
        transitionLeave={true}
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
        transitionAppearTimeout={150}
      >
        {this.props.visible ? menu : null }
      </ReactCSSTransitionGroup>
    );
  }
}

function mapStateToProps ( state: GlobalState ): MenuComponentProps {
  return {
    visible: state.menu.visible
  } as MenuComponentProps;
}

export default connect(mapStateToProps)(Menu);
