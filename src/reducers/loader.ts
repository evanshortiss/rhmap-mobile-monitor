
import {
  HIDE_LOADING,
  SHOW_LOADING,
  UPDATE_LOADING
} from '../actions/loader';

import {
  LoaderViewProps,
  LoaderAction
} from '../interfaces/loader';

export default function loadingReducer (state: LoaderViewProps = { visible: false }, action: LoaderAction): LoaderViewProps {
  switch (action.type) {
    case HIDE_LOADING:
      return {
        visible: false
      };
    case SHOW_LOADING:
      return {
        visible: true,
        message: action.payload.message || 'Please wait...'
      };
    case UPDATE_LOADING:
      return {
        visible: state.visible,
        message: action.payload.message
      };
    default:
      return state;
  }
}
