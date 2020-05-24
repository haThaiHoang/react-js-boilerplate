import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import '@/resources/styles'
import Store from '@/store'
import Theme from '@/theme'

import Init from './init'
import Routes from './routes'

const App = () => (
  <Store>
    <Router>
      <Theme>
        <Init />
        <Routes />
      </Theme>
    </Router>
  </Store>
)

ReactDOM.render(<App />, document.getElementById('application'))
