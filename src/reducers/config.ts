
import xtend = require('xtend');

import {
  SET_ENVIRONMENT,
  SET_USER
} from '../actions/config';

import {
  ConfigState,
  ConfigAction
} from '../interfaces/config';

export default function configReducer (state: ConfigState = {}, action: ConfigAction): ConfigState {
  switch (action.type) {
    case SET_USER:
      return xtend(state, {user: action.payload.user});
    case SET_ENVIRONMENT:
      return xtend(state, {environment:  action.payload.environment});
    default:
      return state;
  }
}
