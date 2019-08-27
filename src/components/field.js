import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { withLocalize } from 'react-localize-redux'
import lodash from 'lodash'
import { Field } from 'formik'

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

export default withLocalize(({
  component: Component,
  translate,
  form,
  name,
  label,
  inline,
  ...props
}) => {
  props = lodash.omit(props, [
    'activeLanguage',
    'addTranslation',
    'addTranslationForLanguage',
    'defaultLanguage',
    'ignoreTranslateChildren',
    'initialize',
    'languages',
    'setActiveLanguage',
    'renderToStaticMarkup'
  ])

  return (
    <Box className={classNames('field', { inline })}>
      {label && (
        <p className="label">{label}</p>
      )}
      <div className="field-content">
        <Field {...props} name={name} component={Component} />
        <p className="error-message">{form.errors[name] && translate(`validation.${form.errors[name]}`)}</p>
      </div>
    </Box>
  )
})
