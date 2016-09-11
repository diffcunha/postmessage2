import Provider from './Provider'

export default class WindowProvider extends Provider {

  constructor (window) {
    super()
    this._window = window
    this._window.addEventListener('message', this._onMessage.bind(this))
  }

  _onMessage (event) {
    const message = event.data
    const context = { origin: event.origin, target: event.target }
    this.onMessage(message, context)
  }
}
