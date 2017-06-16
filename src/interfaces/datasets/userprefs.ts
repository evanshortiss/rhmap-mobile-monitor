
import { SyncDatasetState } from '../sync';

export interface NotificationConfig {
  memory: number// megabytes
  cpu: number // percent
  disk: number // megabytes
}

export interface UserPrefsData {
  notificationConfigs: {
    global: {
      // stores config thresholds per environment
      [environment: string]: NotificationConfig
    }
  }
}

export interface UserPrefsDataset extends SyncDatasetState {
  records: {
    // Will only ever contain a single record name "userprefs" for simplicity
    userprefs: {
      data: UserPrefsData
    }
  }
}
