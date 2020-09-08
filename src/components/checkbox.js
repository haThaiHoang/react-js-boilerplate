import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox as AntdCheckbox } from 'antd'
import styled from 'styled-components'

const StyledCheckbox = styled(AntdCheckbox)`
  /* stylelint-disable */
`

const Checkbox = ({ children, field, form, ...props }) => (
  <StyledCheckbox
    {...props}
    {...field}
    checked={field?.value || props.checked}
  >
    {children}
  </StyledCheckbox>
)
Checkbox.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  checked: PropTypes.bool
}

export default Checkbox
