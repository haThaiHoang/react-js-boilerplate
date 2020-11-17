import React from 'react'
import { Provider } from 'mobx-react'
import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router-dom'

import Configs from '@/configs'
import assets from './assets'
import auth from './auth'
import products from './products'

const browserHistory = createBrowserHistory({ basename: Configs.BASE_NAME })
export const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore)

const stores = {
  routing: routingStore,
  assets,
  auth,
  products
}

export default ({ children }) => (
  <Provider {...stores}>
    <Router history={history}>
      {children}
    </Router>
  </Provider>
)
