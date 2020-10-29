import React from 'react'
import ReactDOM from 'react-dom'

import '@/resources/styles'
import Store from '@/store'
import Theme from '@/theme'
import Init from './init'
import Routes from './routes'

const App = () => (
  <Store>
    <Theme>
      <Init>
        <Routes />
      </Init>
    </Theme>
  </Store>
)

ReactDOM.render(<App />, document.getElementById('application'))
