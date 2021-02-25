import * as React from 'react'
import PropTypes from 'prop-types'

export const forwardInnerRef = (Component) => {
  class ForwardedComponent extends React.Component {
    static propTypes = {
      innerRef: PropTypes.func
    }

    componentDidMount() {
      const { innerRef } = this.props

      if (innerRef) {
        innerRef(this._component)
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          ref={(ref) => { this._component = ref }}
        />
      )
    }
  }

  return ForwardedComponent
}
