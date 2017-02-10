
import { FHEnvironment } from './datasets/resources';
import { LoaderViewProps } from './loader';
import { SyncState } from './sync';

export interface GlobalState {
  resources: {
    records: {
      [key: string]: FHEnvironment
    }
  }
  loader: LoaderViewProps
  sync: SyncState
}
