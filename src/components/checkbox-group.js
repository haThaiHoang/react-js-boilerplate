import React, { Component } from 'react'
import { Checkbox } from 'antd'
import styled from 'styled-components'

const Box = styled.div`
  .ant-checkbox-wrapper {
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
          border: 1px solid #cacaca;

          &::after {
            left: 4px;
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
  }

  .check-box-group {
    display: flex;
    flex-direction: column;
    padding-left: 52px;

    .ant-checkbox-wrapper {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

export default class CheckboxGroup extends Component {
  state = {
    checkedList: [],
    indeterminate: false,
    checkAll: false
  }

  componentDidMount() {
    const checkedList = this.props.field.value

    if (checkedList) {
      this.setState({
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < this.props.options.length,
        checkAll: checkedList.length === this.props.options.length
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const checkedList = nextProps.field.value

    if (checkedList) {
      this.setState({
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < nextProps.options.length,
        checkAll: checkedList.length === nextProps.options.length
      })
    } else {
      this.setState({
        checkedList: [],
        indeterminate: false,
        checkAll: false
      })
    }
  }

  _onChange = (e) => {
    let { checkedList } = this.state
    const { options, field, onChange } = this.props

    if (!checkedList.includes(e.target.name) && e.target.checked) {
      checkedList = checkedList.concat(e.target.name)
    } else if (checkedList.includes(e.target.name) && !e.target.checked) {
      checkedList = checkedList.filter(item => item !== e.target.name)
    }

    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < options.length,
      checkAll: checkedList.length === options.length
    })

    const formikEvent = { target: { value: checkedList, name: field.name } }
    field.onChange(formikEvent)
    if (onChange) onChange(formikEvent)
  };

  _onCheckAllChange = (e) => {
    const { options, field, onChange } = this.props
    const checkedList = e.target.checked ? options.map(item => item.value) : []

    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: e.target.checked
    })

    const formikEvent = { target: { value: checkedList, name: field.name } }
    field.onChange(formikEvent)
    if (onChange) onChange(formikEvent)
  };

  render() {
    const { options, checkAllLabel, field } = this.props
    const { checkedList, indeterminate, checkAll } = this.state

    return (
      <Box>
        <Checkbox
          indeterminate={indeterminate}
          onChange={this._onCheckAllChange}
          checked={checkAll}
        >
          {checkAllLabel}
        </Checkbox>
        <div className="check-box-group">
          {options && options.map(option => (
            <Checkbox
              key={option.value}
              onChange={this._onChange}
              name={option.value}
              checked={field.value?.includes(option.value) || checkedList.includes(option.value)}
            >
              {option.name}
            </Checkbox>
          ))}
        </div>
      </Box>
    )
  }
}
