import React, { Component } from 'react'
import styled from 'styled-components'

import Page from '@/components/page'
import Container from '@/components/container'

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

class Home extends Component {
  state = {}

  render() {
    return (
      <Page>
        <Container>
          <Content>
            <h1>Welcome</h1>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default Home
