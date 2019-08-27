import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(Button)`
`

export default ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)
