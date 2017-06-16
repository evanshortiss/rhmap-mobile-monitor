import * as React from 'react';
import { connect } from 'react-redux';
import { FHEnvironment } from '../interfaces/datasets/resources';
import { GlobalState } from '../interfaces/global';
import historyEngine = require('../history-engine');
import { Link } from 'react-router';
import { FHApp } from '../interfaces/datasets/resources';

interface CloudApplicationsViewProps {
  selectedEnv: string
  environments: {
    [key: string]: FHEnvironment
  }
}

class CloudApplicationsView extends React.Component <CloudApplicationsViewProps, undefined> {
  render () {

    function sorter (app1: FHApp, app2: FHApp) {
      if (app1.title < app2.title) {
        return -1
      } else if (app1.title > app2.title) {
        return 1;
      } else {
        return 0;
      }
    }

    const apps = this.props.environments[this.props.selectedEnv].data.apps;
    const appElements = apps.sort(sorter).map((app) => {
      return (
        <Link to={`/cloud-apps/${app.guid}`} key={app.guid}>
          <div className='entry cloud-app'>
            <h3>{app.title} <span>({app.state})</span> </h3>
            <p>GUID - {app.guid}</p>
          </div>
        </Link>
      )
    });

    return (
      <div className='cloud-applications list-view'>
        {appElements}
      </div>
    );
  }
}


function mapStateToProps ( state: GlobalState ): CloudApplicationsViewProps {
  return {
    selectedEnv: state.config.environment,
    environments: state.resources.records
  } as CloudApplicationsViewProps;
}

export default connect(mapStateToProps)(CloudApplicationsView);
