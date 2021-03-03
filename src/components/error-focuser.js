import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'

@connect
class ErrorFocus extends Component {
  static propTypes = {
    formik: PropTypes.object
  }

  componentDidUpdate(prevProps) {
    const { isSubmitting, isValidating, errors } = prevProps.formik
    const keys = Object.keys(errors)

    if (keys.length > 0 && isSubmitting && !isValidating) {
      const id = `formik-field-${keys[0]}`
      const errorElement = document.getElementById(id)

      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }
  }

  render() {
    return null
  }
}

export default ErrorFocus
