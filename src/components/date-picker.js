import React, { Component } from 'react'
import { Select } from 'antd'
import lodash from 'lodash'
import moment from 'moment'
import styled from 'styled-components'

const Box = styled.div`
  display: flex;

  .date-element {
    margin-right: 40px;
    flex: 1;

    &:last-child {
      margin-right: 0;
    }

    .date-element-label {
      letter-spacing: 0.07px;
      color: #8f8f8f;
    }

    .ant-select {
      color: #606060;
      font-weight: 500;

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

          .ant-select-arrow {
            display: none;
          }
        }
      }
    }
  }
`

const DAYS = lodash.range(1, 32)
const MONTHS = lodash.range(1, 13)
const currentYear = moment().year()
const YEARS = lodash.range(currentYear - 80, currentYear + 1)

export default class DateInput extends Component {
  constructor(props) {
    super(props)

    const { field } = this.props

    this.state = {
      day: field.value && moment(field.value).date(),
      month: field.value && moment(field.value).month() + 1,
      year: field.value && moment(field.value).year()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps.field

    this.setState({
      day: value && moment(value).date(),
      month: value && moment(value).month() + 1,
      year: value && moment(value).year()
    })
  }

  _onInputChange = name => (value) => {
    this.setState({
      [name]: value
    }, () => {
      const { day, month, year } = this.state

      if (day && month && year) {
        this.props.field.onChange({
          target: { value: new Date(`${year}/${month}/${day}`), name: this.props.field.name }
        })
      }
    })
  }

  render() {
    const { dayLabel, monthLabel, yearLabel, disabled } = this.props
    const { day, month, year } = this.state

    const filtedDays = DAYS
      .filter(item => !((month === 2 && item > 29) || ([2, 4, 6, 9, 11].includes(month) && item > 30) || (year && year % 4 !== 0 && month === 2 && item === 29)))
    const filtedMonths = MONTHS
      .filter(item => !((day === 30 && item === 2) || (day === 31 && [2, 4, 6, 9, 11].includes(item))))
    const filtedYears = YEARS
      .filter(item => !(day > 28 && month === 2 && item % 4 !== 0))

    return (
      <Box>
        <div className="date-element">
          <p className="date-element-label">
            {dayLabel || 'Day'}
          </p>
          <Select
            disabled={disabled}
            value={day || undefined}
            onChange={this._onInputChange('day')}
          >
            {filtedDays.map(item => (
              <Select.Option key={item} value={item}>{item}</Select.Option>
            ))}
          </Select>
        </div>
        <div className="date-element">
          <p className="date-element-label">
            {monthLabel || 'Month'}
          </p>
          <Select
            disabled={disabled}
            value={month || undefined}
            onChange={this._onInputChange('month')}
          >
            {filtedMonths.map(item => (
              <Select.Option key={item} value={item}>{item}</Select.Option>
            ))}
          </Select>
        </div>
        <div className="date-element">
          <p className="date-element-label">
            {yearLabel || 'Year'}
          </p>
          <Select
            disabled={disabled}
            value={year || undefined}
            onChange={this._onInputChange('year')}
          >
            {filtedYears.map(item => (
              <Select.Option key={item} value={item}>{item}</Select.Option>
            ))}
          </Select>
        </div>
      </Box>
    )
  }
}
