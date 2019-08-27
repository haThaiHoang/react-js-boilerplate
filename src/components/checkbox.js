import React from 'react'
import { Checkbox } from 'antd'
import styled from 'styled-components'

const StyledCheckbox = styled(Checkbox)`
  margin-left: 0;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.32px;
  color: #505050;
  margin-bottom: 18px;
  user-select: none;
  display: flex;
  align-items: flex-start;

  > span {
    &.ant-checkbox {
      top: 0;
      bottom: 0;

      .ant-checkbox-inner {
        width: 18px;
        height: 18px;
        border: 2px solid #cacaca;

        &::after {
          left: 3px;
        }
      }

      &.ant-checkbox-checked .ant-checkbox-inner {
        background-color: #005398;
        border-color: #005398;
      }

      &.ant-checkbox-indeterminate .ant-checkbox-inner:after {
        left: 50%;
        width: 9px;
        height: 9px;
        background-color: #005398;
      }
    }

    &:last-child {
      margin-left: 20px;
      padding: 0;
    }
  }
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
