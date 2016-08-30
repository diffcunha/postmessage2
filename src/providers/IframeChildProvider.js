import WindowProvider from './WindowProvider';

export default class IframeChildProvider extends WindowProvider {
  
  constructor(window) {
    super(window);
  }

  send(message, context) {
    window.parent.postMessage(message, '*'); // TODO: fix origin
  }

}
