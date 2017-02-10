
export const SYNC_STARTED = 'SYNC_STARTED';
export function syncStarted () {
  return {
    type: SYNC_STARTED
  };
}

export const SYNC_COMPLETE = 'SYNC_COMPLETE';
export function syncComplete () {
  return {
    type: SYNC_COMPLETE
  };
}

export const SYNC_FAILED = 'SYNC_FAILED';
export function syncFailed () {
  return {
    type: SYNC_FAILED
  };
}
