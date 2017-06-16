
import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { GlobalState } from '../interfaces/global';
import { FHEnvironment } from '../interfaces/datasets/resources'
import ResourceThresholds from '../components/domain-resources';


interface EnvironmentViewProps {
  selectedEnv?: string
  resources: {
    // support for multiple environment keys, e.g "acme-dev", "acme-test"
    [key: string]: FHEnvironment
  }
}

interface EnvironmentViewState {
  selectedEnv: string
}


type AppState  = 'SUSPENDED' | 'RUNNING' | 'STOPPED';


class EnvironmentView extends React.Component <EnvironmentViewProps, EnvironmentViewState> {
  getAppsInState (state: AppState) {
    const env = this.props.selectedEnv;
    const resources = this.props.resources[env].data;

    return resources.apps.filter((app) => {
      return app.state.toUpperCase() === state;
    })
  }
  render() {
    const selectedEnv = this.props.selectedEnv;
    const resources = this.props.resources[selectedEnv].data.resources;

    return (
      <div className="environment">

        <br/>
        <div className="ui padded grid">
          <div>
            <p>As of {moment(this.props.resources[selectedEnv].data.ts).format('dddd MMMM Do, hh:mm:ss a')}</p>
          </div>
          <div className="sixteen wide column">
            <h3 className="header colors">
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
            <h3 className="header colors">
              <i className="power icon"></i>
              Application State
            </h3>
          </div>
        </div>
        <div className="ui padded grid">
          <div className="centered four wide column">
            <div className="value">
              <h2>{this.getAppsInState('RUNNING').length}</h2>
            </div>
            <div className="label">
              <h4>Active</h4>
            </div>
          </div>
          <div className="centered four wide column">
            <div className="value">
              <h2>{this.getAppsInState('SUSPENDED').length}</h2>
            </div>
            <div className="label">
              <h4>Suspended</h4>
            </div>
          </div>
          <div className="centered four wide column">
            <div className="value">
              <h2>{this.getAppsInState('STOPPED').length}</h2>
            </div>
            <div className="label">
              <h4>Stopped</h4>
            </div>
          </div>
        </div>
        <div className="ui inverted divider"></div>

        <ResourceThresholds/>
      </div>
    );
  }
}

function mapStateToProps( state: GlobalState ): EnvironmentViewProps {
  return {
    // Inject resources into props for the component
    resources: state.resources.records,
    selectedEnv: state.config.environment
  } as EnvironmentViewProps;
}

function mergeProps(stateProps: any, dispatchProps: any, ownProps: any) {
  stateProps.params = ownProps.params;

  return stateProps;
}

export default connect(mapStateToProps, null, mergeProps)(EnvironmentView);
