import React from 'react'
import { Provider } from 'mobx-react'

import auth from './auth'
import products from './products'

const stores = {
  auth,
  products
}

export default ({ children }) => (
  <Provider {...stores}>
    {children}
  </Provider>
)
