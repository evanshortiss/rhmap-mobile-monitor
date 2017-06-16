
import * as React from 'react';
import * as Redux from 'redux';

import xtend = require('xtend');
import historyEngine = require('../history-engine');

import { connect } from 'react-redux';
import { FHApp } from '../interfaces/datasets/resources';
import { GlobalState } from '../interfaces/global';
import { ChangeEvent } from 'react';
import { updateRecord } from '../actions/sync-dataset';

interface CloudApplicationDetailViewProps {
  saveAlertThresholds: Function
  appId: string
  selectedEnv: string
  appInstances: {
    [key: string]: FHApp
  }
}

class CloudApplicationDetailView extends React.Component <CloudApplicationDetailViewProps, undefined> {
  render () {
    const app = this.props.appInstances[this.props.selectedEnv];

    return (
      <div className='cloud-applications list-view'>

        {/* start of the resource usage pane */}
        <div className='entry cloud-app'>
          <h3>{app.title} <span>({app.state})</span> </h3>
          <p>GUID - {app.guid}</p>

          <div className='ui padded grid'>
            <div className='centered six wide column'>
              <div className='value'>
                <h3>{Math.round(app.memory)}MB</h3>
              </div>
              <div className='label'>
                <h4>RAM</h4>
              </div>
            </div>
            <div className='centered six wide column'>
              <div className='value'>
                <h3>{Math.round(app.disk)}MB</h3>
              </div>
              <div className='label'>
                <h4>Disk</h4>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


function mapStateToProps ( state: GlobalState, props: any ): CloudApplicationDetailViewProps {
  const env = state.config.environment;
  const environments = state.resources.records;
  const targetGuid = props.params.guid;

  // Slightly lazy typing hack
  interface AppContainer {
    [id: string]: FHApp;
  }
  const appInstances:AppContainer = {}

  // Just get copies we need of the specific application
  for (let i in environments) {
    // use react router 'params' object
    // TODO: better typings for params
    appInstances[i] = environments[i].data.apps.filter(a => a.guid === targetGuid)[0];
  }

  return {
    appId: targetGuid,
    selectedEnv: env,
    appInstances: appInstances
  } as CloudApplicationDetailViewProps;
}

export default connect(mapStateToProps)(CloudApplicationDetailView);
