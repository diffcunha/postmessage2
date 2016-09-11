import WindowProvider from './WindowProvider'

export default class IframeParentProvider extends WindowProvider {

  constructor (url, window) {
    super(window)
    this._url = url
    this._iframe = this._window.document.createElement('iframe')
    this._iframe.src = this._url
    this._window.document.body.appendChild(this._iframe)
  }

  send (message, context) {
    this._iframe.contentWindow.postMessage(message, '*') // TODO: fix origin
  }

  get iframe () {
    return this._iframe
  }

}
