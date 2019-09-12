import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux'
import styled from 'styled-components'

import homeEN from '@/languages/home/en.json'
import homeJP from '@/languages/home/jp.json'
import Page from '@/components/page'
import Container from '@/components/container'

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

@withLocalize

class Home extends Component {
  componentDidMount() {
    const { addTranslationForLanguage } = this.props

    addTranslationForLanguage(homeEN, 'en')
    addTranslationForLanguage(homeJP, 'jp')
    console.log("hohoho");
  }

  render() {
    const { translate } = this.props

    return (
      <Page>
        <Container>
          <Content>
            <h1>{translate('home.welcome')}</h1>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default Home
