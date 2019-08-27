import React from 'react'
import { Input } from 'antd'
import classNames from 'classnames'
import styled from 'styled-components'

const StyledInput = styled(Input)`
  height: 42px;
  border: solid 1px #e4e4e4;
  border-radius: 3px;
  font-weight: 500;

  &:hover, &:focus {
    border: solid 1px #d7d7d7;
    box-shadow: none;
  }

  &.modern {
    border: none;
    border-radius: 3px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
  }

  &.simple {
    border: none;
    border-bottom: 1px solid #ced4da;
    height: 32px;
    padding: 4px 0;
    border-radius: 0;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.29px;
    color: #525252;

    &:read-only {
      border-bottom: none;
    }
  }
`

export default ({ field, form, modern, simple, className, ...props }) => (
  <StyledInput
    {...field}
    {...props}
    className={classNames(className, { modern, simple })}
  />
)
