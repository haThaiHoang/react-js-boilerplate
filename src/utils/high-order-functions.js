import React from 'react'

export const forwardInnerRef = (Component) => {
  class ForwardedComponent extends React.Component {
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
