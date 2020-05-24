import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker as AntdDatePicker } from 'antd'
import styled from 'styled-components'

const StyledDatePicker = styled(AntdDatePicker)`
  /* stylelint-disable */
`

const DatePicker = ({ field, form, ...props }) => (
  <StyledDatePicker
    {...field}
    {...props}
  />
)
DatePicker.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object
}

export default DatePicker
