
import {
  HIDE_MENU,
  SHOW_MENU,
  TOGGLE_MENU
} from '../actions/menu';

import {
  MenuAction,
  MenuComponentProps
} from '../interfaces/menu';

export default function menuReducer (state: MenuComponentProps = { visible: false }, action: MenuAction): MenuComponentProps {
  switch (action.type) {
    case HIDE_MENU:
      return {
        visible: false
      };
    case SHOW_MENU:
      return {
        visible: true
      };
    case TOGGLE_MENU:
      return {
        visible: !state.visible
      };
    default:
      return state;
  }
}
