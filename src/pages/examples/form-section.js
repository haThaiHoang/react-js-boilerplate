import { Component } from 'react'
import styled from 'styled-components'

import Button from '@/components/button'

const StyledDiv = styled.div`
  
`

class FormSection extends Component {
  render() {
    return (
      <section>
        <p className="section-title">
          Form
        </p>
        <div className="section-body">
          <StyledDiv>

          </StyledDiv>
        </div>
      </section>
    )
  }
}

export default FormSection
