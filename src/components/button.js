import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import 'antd/es/button/style/css'

const StyledButton = styled(Button)`
`

export default ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)
