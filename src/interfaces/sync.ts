
export interface SyncDatasetAction {
  type: string
  payload: {
    dataset: string
    guid?: string
    record?: Object
    records?: {
      [key: string]: Object
    }
    lastRefreshTs: Date
  }
}

export interface SyncDatasetState {
  records: {
    [key: string]: Object
  }
  lastRefreshTs?: Date
}

export interface SyncState {
  lastCompleteTs?: Date
  lastFailTs?: Date
  isSyncing: boolean
}

export interface SyncAction {
  type: string
}
