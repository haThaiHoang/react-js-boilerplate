import React, { Component } from 'react'
import './style.scss'

import { Container } from '@/components'

export default class NotFound extends Component {
  _onClick = () => {
    const { history } = this.props

    history.push('/')
  }

  render() {
    return (
      <Container className="not-found">
        <div className="content">
          <p className="title">404</p>
          <p className="subtitle">This is not the web page you are looking for</p>
        </div>
      </Container>
    )
  }
}
