
import { ConfigAction } from '../interfaces/config';

export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';
export function setEnvironment (env: string): ConfigAction {
  return {
    type: SET_ENVIRONMENT,
    payload: {
      environment: env
    }
  }
}

export const SET_USER = 'SET_USER';
export function setUser (user: string): ConfigAction {
  return {
    type: SET_USER,
    payload: {
      user: user
    }
  }
}
