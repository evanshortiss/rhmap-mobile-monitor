
import { FHEnvironment } from './datasets/resources';
import { FeedEntry } from './datasets/newsfeed';
import { LoaderViewProps } from './loader';
import { SyncState, SyncDatasetState } from './sync';
import { MenuState } from './menu';

export interface GlobalState {
  resources: SyncDatasetState
  newsfeed: SyncDatasetState
  loader: LoaderViewProps
  sync: SyncState,
  menu: MenuState
}
