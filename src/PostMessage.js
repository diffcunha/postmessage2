const REQUEST_TIMEOUT = 5000;

export default class PostMessage {

  constructor(provider) {
    this._id = 0;
    
    this._provider = provider;
    this._provider.onRequest = this._onRequest.bind(this);
    this._provider.onReply = this._onReply.bind(this);
    this._provider.onError = this._onError.bind(this);

    this._requests = new Map();
    this._handlers = new Map();
  }

  request(name, ...data) {
    return new Promise((resolve, reject) => {
      const id = this._id++; // TODO: better id strategy (?)

      const timeout = setTimeout(() => {
        const { reject } = this._requests.get(id);
        this._requests.delete(id);
        reject('timeout');
      }, REQUEST_TIMEOUT);

      this._requests.set(id, { resolve, reject, timeout });

      this._provider.request(id, name, data);
    });
  }

  handle(name, fn) {
    this._handlers.set(name, fn);
  }

  get provider() {
    return this._provider;
  }

  _onRequest(message) {
    const { name, data } = message;
    const handler = this._handlers.get(name);

    if(!handler) {
      this._provider.error(message, 'method not found');
    }

    handler.call(null, ...data)
      .then(data => this._provider.reply(message, data))
      .catch(data => this._provider.error(message, data));
  }

  _onReply(message) {
    const { id, data } = message;
    const { resolve, timeout } = this._requests.get(id);
    
    clearTimeout(timeout);
    this._requests.delete(id);

    resolve(data);
  }

  _onError(message) {
    const { id, data } = message;
    const { reject, timeout } = this._requests.get(id);
    
    clearTimeout(timeout);
    this._requests.delete(id);
    
    reject(data);
  }

}
