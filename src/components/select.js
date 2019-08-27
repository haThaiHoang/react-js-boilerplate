import React, { Component } from 'react'
import { Select } from 'antd'
import lodash from 'lodash'
import classNames from 'classnames'
import styled from 'styled-components'

const { Option } = Select

const StyledSelect = styled(Select)`
  color: #606060;
  font-weight: 500;

  .ant-select-selection {
    height: 42px;
    border-top: 1px solid #e4e4e4;

    &:hover, &:focus {
      border: solid 1px #d7d7d7;
      box-shadow: none;
    }

    .ant-select-selection__rendered {
      line-height: 41px;
    }
  }

  &.ant-select-sm {
    .ant-select-selection--single {
      height: 38px;

      .ant-select-selection__rendered {
        line-height: 37px;
      }
    }
  }

  &.modern {
    .ant-select-selection {
      border: none;
      border-radius: 3px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
      border: solid 1px #efc3ab;

      .ant-select-selection__rendered {
        padding: 0 12px;
      }
    }
  }

  &.simple {
    .ant-select-selection {
      border: none;
      border-bottom: 1px solid #ced4da;
      border-radius: 0;
      height: 32px;

      &:hover, &:focus {
        border: none;
        border-bottom: 1px solid #ced4da;
        box-shadow: none;
      }

      .ant-select-selection__rendered {
        padding: 0;
        margin: 0;
        font-size: 15px;
        letter-spacing: 0.29px;
        color: #525252;
        line-height: 31px;
      }
    }

    &.ant-select-disabled {
      .ant-select-selection {
        border-bottom: none;
        background-color: initial;

        &:hover {
          border-bottom: none;
        }

        .ant-select-arrow {
          display: none;
        }
      }
    }
  }
`

export default class extends Component {
  _onChange = (value) => {
    const { field, onChange, name } = this.props

    if (onChange) onChange({ target: { value, name: field?.name || name } })
    if (!lodash.isEmpty(field)) field.onChange({ target: { value, name: field.name } })
  }

  _renderOption = (option, index) => {
    if (lodash.isString(option) || lodash.isNumber(option)) {
      return <Option key={index} value={option}>{lodash.upperFirst(option)}</Option>
    }

    const { optionBinding, renderOption } = this.props

    let value
    let name
    if (lodash.isEmpty(optionBinding)) {
      /* eslint-disable prefer-destructuring */
      value = option.value
      name = option.name
    } else {
      value = option[optionBinding.value]
      name = option[optionBinding.name]
    }

    return (
      <Option key={index} value={value} name={name}>
        {renderOption ? renderOption({ value, name }) : name}
      </Option>
    )
  }

  render() {
    const { field, options, onChange, optionBinding, value, modern, simple, className, renderOption, ...props } = this.props

    return (
      <StyledSelect
        {...field}
        {...props}
        className={classNames(className, { modern, simple })}
        onChange={this._onChange}
        value={field?.value || value || (value === 0 || typeof value === 'boolean' ? value : undefined)}
      >
        {options.map(this._renderOption)}
      </StyledSelect>
    )
  }
}
