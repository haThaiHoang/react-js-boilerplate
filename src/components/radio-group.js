import React, { Component } from 'react'
import { Radio } from 'antd'
import styled from 'styled-components'

const Box = styled.div`
  padding-left: 52px;
  user-select: none;

  .ant-radio-group {
    .ant-radio-wrapper {
      height: auto;
      line-height: 1;
      margin-bottom: 18px;
      margin-right: 0;
      display: block;

      &:last-child {
        margin-bottom: 0;
      }

      > span {
        &.ant-radio {
          .ant-radio-inner {
            border-width: 2px;
            width: 18px;
            height: 18px;
            border-color: #cacaca;

            &::after {
              background-color: #005398;
              top: 2px;
              left: 2px;
              width: 10px;
              height: 10px;
            }
          }

          &.ant-radio-checked {
            .ant-radio-inner {
              border-color: #005398;
            }
          }
        }

        &:last-child {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.32px;
          color: #505050;
          padding: 0;
          margin-left: 20px;
        }
      }
    }
  }
`

export default class RadioGroup extends Component {
  _renderOption = option => (
    <Radio key={option.value} value={option.value}>
      {option.name}
    </Radio>
  )

  render() {
    const { options, field } = this.props

    return (
      <Box>
        <Radio.Group {...field}>
          {options.map(this._renderOption)}
        </Radio.Group>
      </Box>
    )
  }
}
