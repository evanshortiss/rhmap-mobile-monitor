
export function deviceIsIos () {
  return window.navigator.userAgent.match(/iphone|ipad/gi);
}

export function dismissKeyboard () {
  // Hacky. Basically, find inputs in the DOM and blur them.
  // document.activeElement is not reliable for this hence the input approach
  (window as any).$('input').each((idx: number, el: HTMLElement) => el.blur());
}

export function openUrl (url: string, target:string='_blank') {
  window.open(url, target)
}
