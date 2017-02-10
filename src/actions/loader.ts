
import { LoaderAction } from '../interfaces/loader';

export const SHOW_LOADING = 'SHOW_LOADING';
export function showLoading (loadingMessage: string): LoaderAction {
  return {
    type: SHOW_LOADING,
    payload: {
      message: loadingMessage
    }
  }
}

export const HIDE_LOADING = 'HIDE_LOADING';
export function hideLoading (): LoaderAction {
  return {
    type: HIDE_LOADING,
    payload: {
      visible: false
    }
  }
}

export const UPDATE_LOADING = 'UPDATE_LOADING';
export function updateMessage (msg: string): LoaderAction {
  return {
    type: UPDATE_LOADING,
    payload: {
      message: msg
    }
  }
}
