import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  height: 42px;
  padding: 0 35px;
  font-size: 15px;
  box-shadow: none;
  letter-spacing: 0.32px;
  font-weight: 600;
  border: none;
  background-color: #005398;
  cursor: pointer;
  color: white;

  &:after {
    display: none;
  }

  &:hover {
    background-color: #024277;
    color: white;
  }

  &:active {
    background-color: #005398;
  }

  &:focus {
    background-color: #005398;
    color: white;

    &:hover {
      background-color: #024277;
    }
  }

  &:disabled {
    color: rgba(0,0,0,.25);
    background-color: #f5f5f5;
    border: 1px solid #dedede;
  }

  &.ant-btn-primary {
    background-color: #f47629;

    &:hover {
      background-color: #ff9757;
    }

    &:active {
      background-color: #d4621c;
    }

    &:disabled {
      color: rgba(0,0,0,.25);
      background-color: #f5f5f5;
      border: 1px solid #dedede;
    }
  }

  &.ant-btn-lg {
    height: 46px;
    padding: 0 58px;
    font-size: 18px;
  }

  &.ant-btn-sm {
    height: 38px;
    padding: 0 21px;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.32px;
  }

  &.ant-btn-basic {
    background-color: #e4e8ed;
    color: #656565;

    &:hover {
      background-color: #c9cdd2;
    }

    &:active {
      background-color: #e4e8ed;
    }
  }

  &.ant-btn-edit {
    background-color: #d4eafe;
    color: #4998e3;
    font-weight: normal;

    &:hover {
      background-color: #b9d9f7;
    }

    &:active {
      background-color: #e0edf9;
    }
  }

  &.ant-btn-delete {
    background-color: #fedee0;
    color: #e97279;
    font-weight: normal;

    &:hover {
      background-color: #ffccd0;
    }

    &:active {
      background-color: #fde6e8;
    }
  }

  &.ant-btn-danger {
    background-color: #e97279;
    color: white;

    &:hover {
      background-color: #e26168;
    }

    &:active {
      background-color: #e97279;
    }
  }

  &.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline):not(.ant-btn-icon-only) {
    padding-left: 46px;
  }
`

export default ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)
