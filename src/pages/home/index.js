import React from 'react'
import './style.scss'

import Page from '@/components/page'
import Container from '@/components/container'

export default () => (
  <Page className="home">
    <Container>
      <div className="content">
        <h1>Welcome</h1>
      </div>
    </Container>
  </Page>
)
