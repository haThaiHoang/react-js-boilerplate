import React from 'react'
import { Checkbox } from 'antd'
import styled from 'styled-components'

const StyledCheckbox = styled(Checkbox)`
`

export default ({ children, field, form, ...props }) => (
  <StyledCheckbox
    {...props}
    {...field}
    checked={field?.value || props.checked}
  >
    {children}
  </StyledCheckbox>
)
