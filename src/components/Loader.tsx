import * as React from 'react';
import { connect } from 'react-redux';
import { LoaderViewProps } from '../interfaces/loader'
import { GlobalState } from '../interfaces/global';

class LoadingView extends React.Component <LoaderViewProps, undefined> {
  render() {
    let style = {
      display: this.props.visible ? 'inherit' : 'none'
    }

    return (
      <div style={style} className="loader">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube colors rh-red bg"></div>
          <div className="sk-cube2 sk-cube colors rh-red bg"></div>
          <div className="sk-cube4 sk-cube colors rh-red bg"></div>
          <div className="sk-cube3 sk-cube colors rh-red bg"></div>
        </div>
        <h3>
          {this.props.message}
        </h3>
      </div>
    );
  }
}

function mapStateToProps( state: GlobalState ): LoaderViewProps {
  return state.loader;
}

export default connect(mapStateToProps)(LoadingView);
