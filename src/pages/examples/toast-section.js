import styled from 'styled-components'

import Button from '@/components/button'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  > * {
    margin-bottom: 10px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export default () => (
  (
    <section>
      <p className="section-title">
        Toast
      </p>
      <div className="section-body">
        <StyledDiv>
          <Button>Normal</Button>
          <Button type="primary">Primary</Button>
          <Button type="primary" loading>Primary - Loading</Button>
        </StyledDiv>
      </div>
    </section>
  )
)
