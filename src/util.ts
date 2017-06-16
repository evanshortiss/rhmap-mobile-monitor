
import { GlobalState } from './interfaces/global';

export function deviceIsIos () {
  return window.navigator.userAgent.match(/iphone|ipad/gi);
}

/**
 * Hack to dismiss the keyboard. Find each potential input that is focused and
 * calls input.blur() which will dismiss the keyboard
 *
 * document.activeElement is not reliable for this hence the input approach
 */
export function dismissKeyboard () {
  (window as any).$('input').each((idx: number, el: HTMLElement) => el.blur());
}
