import WindowProvider from './WindowProvider'

export default class IframeChildProvider extends WindowProvider {

  send (message, context) {
    window.parent.postMessage(message, '*') // TODO: fix origin
  }

}
