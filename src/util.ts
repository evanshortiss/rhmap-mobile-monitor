

export function deviceIsIos () {
  return window.navigator.userAgent.match(/iphone/gi);
}

export function dismissKeyboard () {
  (window as any).$('input').each((idx: number, el: HTMLElement) => el.blur());
}
