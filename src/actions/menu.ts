
import { MenuAction } from '../interfaces/menu';

export const SHOW_MENU = 'SHOW_MENU';
export function showMenu (): MenuAction {
  return {
    type: SHOW_MENU
  }
}

export const HIDE_MENU = 'HIDE_MENU';
export function hideMenu (): MenuAction {
  return {
    type: HIDE_MENU
  }
}

export const TOGGLE_MENU = 'TOGGLE_MENU';
export function toggleMenu (): MenuAction {
  return {
    type: TOGGLE_MENU
  }
}
