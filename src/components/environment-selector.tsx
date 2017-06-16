import * as React from 'react';
import * as Redux from 'redux';
import { ConfigAction } from '../interfaces/config'
import { setEnvironment } from '../actions/config';
import { connect } from 'react-redux';
import { GlobalState } from '../interfaces/global';
import { FHEnvironment } from '../interfaces/datasets/resources';

interface EnvironmentSelectorProps {
  setEnvironment: Function
  selectedEnv?: string
  resources: {
    [key: string]: FHEnvironment
  }
}

interface EnvironmentSelectorDispatchProps {
  setEnvironment: Function
}

class EnvironmentSelector extends React.Component <EnvironmentSelectorProps, undefined> {
  getAppsInState (state: string) {
    const env = this.props.selectedEnv;
    const resources = this.props.resources[env].data;

    return resources.apps.filter((app) => app.state.toUpperCase() === state);
  }

  onEnvChange(e: any) {
    this.props.setEnvironment(e.target.value);
  }

  render() {
    if (!this.props.selectedEnv) {
      // When the app is on the login screen no environments will be loaded.
      // This means we can't show this component yet
      return <span/>;
    }

    const selectedEnv = this.props.selectedEnv;
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
      <div className="environment-selector">
        <select onChange={this.onEnvChange.bind(this)} className="colors rh-green bg">
          {envOptions}
        </select>
      </div>
    );
  }
}

function mapStateToProps( state: GlobalState ): EnvironmentSelectorProps {
  return {
    selectedEnv: state.config.environment,
    resources: state.resources.records
  } as EnvironmentSelectorProps;
}

function mapDispatchToProps (dispatch: Redux.Dispatch<ConfigAction>) {
  return {
    setEnvironment: (env: string) => {
      dispatch(setEnvironment(env));
    }
  };
}

export default connect<{}, EnvironmentSelectorDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(EnvironmentSelector);
