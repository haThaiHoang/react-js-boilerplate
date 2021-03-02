import styled from 'styled-components'

import Page from '@/components/page'
import Container from '@/components/container'
import FetchableTableSection from './fetchable-table-section'
import ModalSection from './modal-section'

const Content = styled.div`
  padding: 30px 0 100px;

  section {
    margin-bottom: 40px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .section-title {
      font-size: 25px;
      margin-bottom: 10px;
    }
    
    .section-body {
      padding: 20px;
      border-radius: 5px;
      background-color: white;
    }
  }
`

export default () => (
  <Page>
    <Container>
      <Content>
        <FetchableTableSection />
        <ModalSection />
      </Content>
    </Container>
  </Page>
)
