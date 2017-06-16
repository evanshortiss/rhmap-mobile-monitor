
import Promise = require('bluebird');
import { auth, getFHParams } from 'fh-js-sdk';

export function performFhAuth (username: string, password: string) {
  return new Promise((resolve, reject) => {
    auth({
      policyId: 'MonitorAuth',
      clientToken: getFHParams().appid,
      params: {
        userId: username,
        password: password
      }
    }, resolve, reject);
  });
}
