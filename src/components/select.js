import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select as AntdSelect } from 'antd'
import lodash from 'lodash'
import styled from 'styled-components'

const { Option } = AntdSelect

const StyledSelect = styled(AntdSelect)`
  /* stylelint-disable */
`

export default class extends Component {
  static propTypes = {
    field: PropTypes.object,
    optionBinding: PropTypes.object,
    onChange: PropTypes.func,
    renderOption: PropTypes.func,
    name: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.any
  }

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
    const { field, options, onChange, optionBinding, value, renderOption, ...props } = this.props

    return (
      <StyledSelect
        {...field}
        {...props}
        onChange={this._onChange}
        value={field?.value || value}
      >
        {options.map(this._renderOption)}
      </StyledSelect>
    )
  }
}
