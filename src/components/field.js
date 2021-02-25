import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'
import { FastField as FormikFastField, Field as FormikField, ErrorMessage } from 'formik'

import Typography from './typography'

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
  component: InputComponent,
  className,
  name,
  label,
  blockUnnecessaryRerender,
  ...props
}) => {
  const FieldComponent = blockUnnecessaryRerender ? FormikFastField : FormikField

  return (
    <Box className={classNames(className, 'field')}>
      {label && (
        <p className="label">{label}</p>
      )}
      <div className="field-content">
        <FieldComponent {...props} name={name} component={InputComponent} />
        <ErrorMessage name={name}>
          {(msg) => msg && (
            <div className="error-box">
              <Typography size="tiny" className="error-message">{msg}</Typography>
            </div>
          )}
        </ErrorMessage>
      </div>
    </Box>
  )
}
Field.propTypes = {
  component: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  inline: PropTypes.bool,
  blockUnnecessaryRerender: PropTypes.bool
}
Field.defaultProps = {
  blockUnnecessaryRerender: true
}

export default Field
