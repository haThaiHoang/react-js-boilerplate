import React from 'react'
import PropTypes from 'prop-types'
import { Input as AntdInput } from 'antd'
import styled from 'styled-components'

const StyledInput = styled(AntdInput)`
  /* stylelint-disable */
`

const Input = ({ field, form, ...props }) => (
  <StyledInput
    {...field}
    {...props}
  />
)
Input.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object
}

export default Input
