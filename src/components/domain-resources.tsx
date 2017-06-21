
import * as React from 'react';
import * as Redux from 'redux';
import xtend = require('xtend');
import historyEngine = require('../history-engine');
import { set, cloneDeep } from 'lodash';
import { connect } from 'react-redux';
import { FHApp } from '../interfaces/datasets/resources';
import { GlobalState } from '../interfaces/global';
import { ChangeEvent } from 'react';
import { updateRecord } from '../actions/sync-dataset';
import { NotificationConfig, UserPrefsData } from '../interfaces/datasets/userprefs';

type ResourceType  = 'disk' | 'cpu' | 'memory';

const defaultConfig: NotificationConfig = {
  cpu: 0,
  memory: 0,
  disk: 0
};

interface ResourceUsageThresholdDispatchProps {
  saveAlertThresholds: Function
}

interface ResourceUsageThresholdViewProps {
  saveAlertThresholds: Function
  thresholds: UserPrefsData
  selectedEnv: string
}

interface ResourceUsageThresholdViewState {
  thresholds: NotificationConfig
}

class ResourceUsageThresholdView extends React.Component <ResourceUsageThresholdViewProps, ResourceUsageThresholdViewState> {
  constructor (props: ResourceUsageThresholdViewProps) {
    super(props);
    this.state = {
      thresholds: props.thresholds.notificationConfigs.global[props.selectedEnv] || cloneDeep(defaultConfig)
    };
  }

  componentWillReceiveProps (props: ResourceUsageThresholdViewProps) {
    const config = props.thresholds.notificationConfigs.global[props.selectedEnv];

    this.setState({
      // ensure configs that don't exist are set to 0
      thresholds: xtend(defaultConfig, config)
    });
  }

  onResourceThresholdChanged (type: ResourceType, val: string) {
    const { selectedEnv } = this.props;

    const newState = cloneDeep(this.state);

    newState.thresholds[type] = parseInt(val, 10);

    if (isNaN(newState.thresholds[type])) {
      newState.thresholds[type] = 0;
    }

    this.setState(newState);
  }

  saveAlertThresholds () {
    const { selectedEnv, thresholds } = this.props;

    this.props.saveAlertThresholds(
      set(
        cloneDeep(thresholds),
        `notificationConfigs.global.${selectedEnv}`,
        this.state.thresholds
      )
    );
  }

  render () {

    return (
      <div className="cloud-applications list-view">
        <div className='entry cloud-app'>
          <h3><i className="announcement icon"></i> Alert Thresholds</h3>
          <p>Setting these to values greater than zero will cause a notification to be triggered if the thresholds are exceeded for too long.</p>
          <div className='ui left action icon input'>
            <button className='ui blue labeled icon button'>
              <i className='dashboard icon'></i>
              CPU Threshold (%)
            </button>
            <input pattern='[0-9]*' type='text' onChange={(e) => { this.onResourceThresholdChanged('cpu', e.target.value) }} value={this.state.thresholds.cpu}/>
          </div>

          <div className='ui left action icon input'>
            <button className='ui blue labeled icon button'>
              <i className='signal icon'></i>
              RAM Threshold (MB)
            </button>
            <input pattern='[0-9]*' type='text' onChange={(e) => { this.onResourceThresholdChanged('memory', e.target.value) }} value={this.state.thresholds.memory}/>
          </div>

          <div className='ui left action icon input'>
            <button className='ui blue labeled icon button'>
              <i className='disk outline icon'></i>
              Disk Threshold (MB)
            </button>
            <input pattern='[0-9]*' type='text' onChange={(e) => { this.onResourceThresholdChanged('disk', e.target.value) }} value={this.state.thresholds.disk}/>
          </div>

          <br></br>
          <button onClick={() => {this.saveAlertThresholds()}} style={{margin: '1.25em auto 0.5em auto', display: 'block'}} className='ui primary colors rh-green bg button'>
            Save Alert Thresholds
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps ( state: GlobalState, props: any ): ResourceUsageThresholdViewProps {
  return {
    selectedEnv: state.config.environment,
    thresholds: state.userprefs.records.userprefs.data
  } as ResourceUsageThresholdViewProps;
}

function mapDispatchToProps (dispatch: Redux.Dispatch<any>) {
  return {
    saveAlertThresholds: (cfg: NotificationConfig) => {
      return updateRecord(dispatch, null, {
        dataset: 'userprefs',
        guid: 'userprefs',
        record: cfg
      });
    }
  };
}

export default connect<{}, ResourceUsageThresholdDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(ResourceUsageThresholdView);




