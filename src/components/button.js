import { Button } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  // Put your custom styles for Button here
`

export default ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)
