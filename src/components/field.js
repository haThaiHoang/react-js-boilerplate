import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'
import { Field as FormikField, ErrorMessage } from 'formik'

const Box = styled.div`
  position: relative;

  .label {
    margin-bottom: 12px;
  }

  .field-content {
    .error-message {
      text-align: right;
      font-size: 12px;
      color: red;
      height: 18px;
      margin-top: 3px;
    }
  }

  &.inline {
    display: flex;
    align-items: center;

    .label {
      width: 150px;
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 0;
      letter-spacing: 0.29px;
      color: #272727;
    }

    .field-content {
      flex: 1;
      min-width: 0;

      .error-message {
        height: auto;
      }
    }
  }
`
const Field = ({
  component: Component,
  name,
  label,
  inline,
  ...props
}) => (
  <Box className={classNames('field', { inline })}>
    {label && (
      <p className="label">{label}</p>
    )}
    <div className="field-content">
      <FormikField {...props} name={name} component={Component} />
      <p className="error-message"><ErrorMessage name={name} /></p>
    </div>
  </Box>
)
Field.propTypes = {
  component: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  inline: PropTypes.bool
}

export default Field
