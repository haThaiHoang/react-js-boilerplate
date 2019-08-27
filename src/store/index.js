import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { LocalizeProvider } from 'react-localize-redux'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'

import Configs from '@/configs'
import createRootReducer from './reducers'
import sagas from './sagas'

const history = createBrowserHistory({
  basename: Configs.BASE_NAME
})

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  createRootReducer(history),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(createRootReducer(history)))
}

sagaMiddleware.run(sagas)

export default ({ children }) => (
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <ConnectedRouter history={history}>
        {children}
      </ConnectedRouter>
    </LocalizeProvider>
  </Provider>
)
