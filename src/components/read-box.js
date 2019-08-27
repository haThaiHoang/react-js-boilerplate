import React from 'react'
import styled from 'styled-components'

const ReadBox = styled.div`
  min-height: 32px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.29px;
  color: #525252;
  padding: 5px 0;
`

export default ({ field }) => (
  <ReadBox>
    {field.value}
  </ReadBox>
)
