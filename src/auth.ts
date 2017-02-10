
import Promise = require('bluebird');

declare var $fh: any;

export function performFhAuth (username: string, password: string) {
  return new Promise((resolve, reject) => {
    $fh.auth({
      policyId: 'MonitorAuth',
      clientToken: $fh.getFHParams().appid,
      params: {username, password}
    }, resolve, reject);
  });
}
