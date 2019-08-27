import React from 'react'
import ReactDOM from 'react-dom'

import '@/resources/styles'
import Store from '@/store'
import Theme from '@/theme'
import Routes from './routes'

const App = () => (
  <Store>
    <Theme>
      <Routes />
    </Theme>
  </Store>
)

ReactDOM.render(<App />, document.getElementById('application'))
