import React from 'react'
import styled from 'styled-components'

import Page from '@/components/page'
import Container from '@/components/container'

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default () => (
  <Page>
    <Container>
      <Content>
        <h1>Welcome</h1>
      </Content>
    </Container>
  </Page>
)
