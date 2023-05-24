import { EVENTS } from './consts'

export function navigate (href?: string | URL) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function getCurrentPath () { return window.location.pathname }
