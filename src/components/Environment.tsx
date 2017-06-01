import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../interfaces/global';
import * as moment from 'moment';
import {
  EnvironmentViewProps,
  EnvironmentViewState
} from '../interfaces/views';

// TODO - better typing? ¯\_(ツ)_/¯
const APP_STATES = {
  SUSPENDED: 'SUSPENDED',
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED'
};

class EnvironmentView extends React.Component <EnvironmentViewProps, EnvironmentViewState> {
  constructor (props: EnvironmentViewProps) {
    super();

    function getProdEnv () {
      return Object.keys(props.resources).filter((env) => {
        return env.toLowerCase().indexOf('prod') !== -1;
      })[0];
    }

    this.state = {
      selectedEnv: props.params.env || getProdEnv() || Object.keys(props.resources)[0]
    };
  }
  getAppsInState (state: string) {
    const env = this.state.selectedEnv;
    const resources = this.props.resources[env].data;

    return resources.apps.filter((app) => {
      return app.state.toUpperCase() === state;
    })
  }
  onEnvChange(e: any) {
    this.setState({
      selectedEnv: e.target.value
    });
  }
  render() {
    const selectedEnv = this.state.selectedEnv;
    const resources = this.props.resources[selectedEnv].data.resources;

    // Resources is an object with keys, where each key is an environment
    const envOptions = Object.keys(this.props.resources).map((e) => {
      let isSelected = false;

      if (e === selectedEnv) {
        isSelected = true;
      }

      return (
        <option
          key={e}
          selected={isSelected}
          value={e}>{e.toUpperCase()}
        </option>
      );
    });

    return (
      <div className="environment">

        <select onChange={this.onEnvChange.bind(this)} className="colors rh-green bg">
          {envOptions}
        </select>

        <div className="ui padded grid">
          <div>
            <p>As of {moment(this.props.resources[selectedEnv].data.ts).format('dddd MMMM Do, hh:mm:ss a')}</p>
          </div>
          <div className="sixteen wide column">
            <h3 style={{marginBottom: '0.2em'}} className="header colors">
              <i className="disk outline icon"></i>
              Resource Usage
            </h3>
          </div>
        </div>
        <div className="ui padded grid">
          <div className="centered four wide column">
            <div className="value">
              <h2>{resources.cpu.used}%</h2>
            </div>
            <div className="label">
              <h4>CPU</h4>
            </div>
          </div>
          <div className="centered four wide column">
            <div className="value">
              <h2>{Math.round(resources.memory.used / resources.memory.total * 100)}%</h2>
            </div>
            <div className="label">
              <h4>RAM</h4>
            </div>
          </div>
          <div className="centered four wide column">
            <div className="value">
              <h2>{Math.round(resources.disk.used / resources.disk.total * 100)}%</h2>
            </div>
            <div className="label">
              <h4>Disk</h4>
            </div>
          </div>
          <div className="centered four wide column">
            <div className="value">
              <h2>{Math.round(resources.cache.used / resources.cache.total * 100)}%</h2>
            </div>
            <div className="label">
              <h4>Cache</h4>
            </div>
          </div>
        </div>
        <div className="ui inverted divider"></div>

        <div className="ui padded grid">
          <div className="sixteen wide column">
            <h3 style={{marginBottom: '0.2em'}} className="header colors">
              <i className="power icon"></i>
              Application State
            </h3>
          </div>
        </div>
        <div className="ui padded grid">
          <div className="centered four wide column">
            <div className="value">
              <h2>{this.getAppsInState(APP_STATES.RUNNING).length}</h2>
            </div>
            <div className="label">
              <h4>Active</h4>
            </div>
          </div>
          <div className="centered four wide column">
            <div className="value">
              <h2>{this.getAppsInState(APP_STATES.SUSPENDED).length}</h2>
            </div>
            <div className="label">
              <h4>Suspended</h4>
            </div>
          </div>
          <div className="centered four wide column">
            <div className="value">
              <h2>{this.getAppsInState(APP_STATES.STOPPED).length}</h2>
            </div>
            <div className="label">
              <h4>Stopped</h4>
            </div>
          </div>
        </div>
        <div className="ui inverted divider"></div>

      </div>
    )
  }
}

function mapStateToProps( state: GlobalState ): EnvironmentViewProps {
  return {
    // Inject resources into props for the component
    resources: state.resources.records
  } as EnvironmentViewProps;
}

function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
  stateProps.params = ownProps.params;

  return stateProps;
}

export default connect(mapStateToProps, null, mergeProps)(EnvironmentView);
