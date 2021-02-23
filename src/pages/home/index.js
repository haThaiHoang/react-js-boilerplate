import React, { Component } from 'react'
import styled from 'styled-components'
import { withTranslation } from 'react-i18next'

import Page from '@/components/page'
import Container from '@/components/container'

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

@withTranslation()
class Home extends Component {
  state = {}

  render() {
    const { t } = this.props

    return (
      <Page>
        <Container>
          <Content>
            <h1>{t('welcome')}</h1>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default Home
