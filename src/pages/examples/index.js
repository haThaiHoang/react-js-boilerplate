import React, { Component } from 'react'
import styled from 'styled-components'

import Page from '@/components/page'
import Container from '@/components/container'
import Button from '@/components/button'
import ExampleModal from './example-modal'

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 20px;
  }
`

export default class Examples extends Component {
  render() {
    return (
      <Page>
        <Container>
          <Content>
            <h1>Examples</h1>
            <Button
              type="primary"
              onClick={() => this._exampleModal.open()}
            >
              Open Example Modal
            </Button>
            <ExampleModal
              innerRef={(ref) => { this._exampleModal = ref }}
            />
          </Content>
        </Container>
      </Page>
    )
  }
}
