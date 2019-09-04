import React from 'react'
import { Input } from 'antd'
import classNames from 'classnames'
import styled from 'styled-components'
import 'antd/es/input/style/css'

const StyledInput = styled(Input)`
`

export default ({ field, form, modern, simple, className, ...props }) => (
  <StyledInput
    {...field}
    {...props}
    className={classNames(className, { modern, simple })}
  />
)
