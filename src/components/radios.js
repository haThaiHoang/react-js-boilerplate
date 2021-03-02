import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import { Colors } from '@/theme'
import Typography from '@/components/typography'

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 48px;
  align-items: flex-end;
  
  &.showLine {
    border-top: 1px solid #e0e0e0;
  }
  
  .label-box {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    user-select: none;
    margin-right: 30px;
    
    .typography {
      flex: 1;
    }
  }
  
  /* Hide the browser's default radio button */
  .label-box input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  
  /* Create a custom radio button */
  .checkmark {
    margin-right: 10px;
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 50%;
    border: 1px solid #849095;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* On mouse-over, add a grey background color */
  .label-box:hover input ~ .checkmark {
    opacity: 0.8;
  }
  
  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: "";
    opacity: 0;
  }
  
  /* Show the indicator (dot/circle) when checked */
  .label-box input:checked ~ .checkmark:after {
    opacity: 1;
  }
  
  .label-box input:checked ~ .checkmark {
    border: 1px solid ${Colors.PRIMARY};
  }

  /* Style the indicator (dot/circle) */
  .label-box .checkmark:after {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${Colors.PRIMARY};
    transition: opacity 0.2s;
  }
  
  &.vertical {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    
    .label-box {
      margin-bottom: 14px;
    }
  }
  
  &.viewOnly {
    .label-box .checkmark:after {
      background: #849095;
    }
    
    .checkmark {
      border: 1px solid #849095;
    }
    
    .label-box:hover input ~ .checkmark {
      opacity: 1;
    }
    
    .label-box input:checked ~ .checkmark {
      border: 1px solid #849095;
    }
  }
`

class Radios extends Component {
  static propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    options: PropTypes.array,
    value: PropTypes.any,
    name: PropTypes.string,
    vertical: PropTypes.bool,
    viewOnly: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    options: []
  }

  _onChecked = (option) => {
    const { field, form, onChange, viewOnly } = this.props
    if (viewOnly) return
    if (form && field) form.setFieldValue(field.name, option.value)
    if (onChange) onChange(option)
  }

  _renderOption = (option) => {
    const { field, name, value } = this.props
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label key={option.value} className="label-box">
        <input
          type="radio"
          checked={(field?.value ?? value) === option.value}
          onChange={() => this._onChecked(option)}
          name={field?.name || name}
        />
        <span className="checkmark" />
        <Typography>{option.name}</Typography>
      </label>
    )
  }

  render() {
    const { className, options, vertical, viewOnly } = this.props

    return (
      <StyledDiv
        className={classnames({
          vertical,
          viewOnly
        }, 'radios', className)}
      >
        {options.map(this._renderOption)}
      </StyledDiv>
    )
  }
}

export default Radios
