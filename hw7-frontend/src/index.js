require('expose?$!expose?jQuery!jquery')

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducer'
import App from './components/app'
import { initVisit } from './components/auth/authactions'

const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(thunk, logger))

store.dispatch(initVisit())

render(
  <Provider store = { store } >
      <App / >
  </Provider>,
    document.getElementById('app')
)
