
import { ResourcesDataset } from './datasets/resources';
import { UserPrefsDataset } from './datasets/userprefs';
import { LoaderViewProps } from './loader';
import { SyncState, SyncDatasetState } from './sync';
import { MenuState } from './menu';
import { ConfigState } from './config';

export interface GlobalState {
  resources: ResourcesDataset
  newsfeed: SyncDatasetState
  userprefs: UserPrefsDataset
  loader: LoaderViewProps
  sync: SyncState,
  menu: MenuState,
  config: ConfigState
}
