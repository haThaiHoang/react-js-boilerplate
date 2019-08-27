import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import '@/resources/styles'
import Store from '@/store'
import Routes from './routes'

function fadePreloading() {
  const preloading = document.getElementsByClassName('preloading')[0]

  const fadeEffect = setInterval(() => {
    if (!preloading.style.opacity) {
      preloading.style.opacity = 1
    }
    if (preloading.style.opacity === '1') {
      preloading.style.opacity = 0
    } else {
      clearInterval(fadeEffect)
      preloading.style.display = 'none'
    }
  }, 500)
}

class App extends Component {
  componentDidMount = () => {
    fadePreloading()
  }

  render() {
    return (
      <Store>
        <Routes />
      </Store>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('application'))
