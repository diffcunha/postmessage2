import sinon from 'sinon'
import { expect } from 'chai'

import PostMessage from '../../src/PostMessage'

describe('PostMessage class', function () {
  const provider = {}
  const postMessage = new PostMessage(provider)

  it('exports a module', function () {
    const actual = typeof PostMessage
    const expected = 'function'
    expect(actual).to.be.equal(expected)
  })

  it('returns a PostMessage instance', function () {
    const actual = postMessage
    const expected = PostMessage
    expect(actual).to.be.an.instanceOf(expected)
  })

  describe('request method', function () {
    it('returns a promise', function () {
      postMessage.request()
    })

    it('calls `request` on dispatcher with id, name, data, target and origin', function () {
      const name = 'name'
      const arg1 = 'arg1'
      const arg2 = 'arg2'

      const result = client.request(name, arg1, arg2)

      expect(target.postMessage.calledOnce).to.be.true
      expect(target.postMessage.firstCall.args[0].id).to.be.equal(id)
      expect(target.postMessage.firstCall.args[0].name).to.be.equal(name)
      expect(target.postMessage.firstCall.args[0].data).to.be.equal(data)
      expect(target.postMessage.firstCall.args[0].type).to.be.equal('request')
      expect(target.postMessage.firstCall.args[1]).to.be.equal(origin)
    })
  })

  describe('`handler` method', function () {
    it('adds an entry on _handlers', function () {
      const handler = function () {}
      postMessage.handler('name', handler)
      expect(postMessage._handlers.get('name')).to.be.equal(handler)
    })
  })

  describe('`_onRequest` method', function () {
    let sandbox
    let handlersMock
    let providerMock

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      handlersMock = {
        get: sandbox.spy()
      }
      providerMock = {
        reply: sandbox.spy(),
        request: sandbox.spy()
      }
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('calls `error` on provider if handler not found', function () {
      const message = {
        id: 'id',
        name: 'messageName'
      }

      handlersMock.get.returns(null)

      postMessage._onRequest(message)
      expect(postMessage._handlers.get('name')).to.be.equal(handler)
    })

    it('calls `reply` on provider if promise returned by handler resolves', function () {
      const message = {
        id: 'id',
        name: 'massage_name'
      }

      const handler = function (name) {
        expect(name).to.be.equal(message.name)
        return Promise.resolve(true)
      }

      const stub = sinon.stub(postMessage._handlers, 'get').returns(handler)

      // const sinon.stub(postMessage._provider, 'reply')
    })

    it('calls `error` on provider if promise returned by handler rejects', function () {
    })
  })
})
