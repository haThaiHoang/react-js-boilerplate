import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'

import { forwardInnerRef } from '@/utils/high-order-functions'
import { Modal, Button } from '@/components'
import { actions, TYPES } from '@/store/actions'

@connect(state => ({
  applicationStore: state.application
}), {
  moveApplications: actions.moveApplications
})
@forwardInnerRef
class UpdateToPaidCheckModal extends Component {
  state = {
    isOpen: false
  }

  open = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  _onSubmit = () => {
    const { moveApplications, checkedApplicationIds, callbackSuccess, type } = this.props
    if (!type) return
    const payload = {
      type,
      ids: checkedApplicationIds.map(id => ({ id }))
    }
    moveApplications(payload, (action) => {
      if (action === TYPES.MOVE_APPLICATIONS_SUCCESS) {
        this.close()
        callbackSuccess()
      }
    })
  }

  _renderForm = ({ handleSubmit }) => {
    const { applicationStore } = this.props

    return (
      <Form className="form">
        <div className="action-box">
          <Button
            type="basic"
            onClick={this.close}
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="danger"
            onClick={handleSubmit}
            loading={applicationStore?.submitting === TYPES.MOVE_APPLICATIONS_REQUEST}
          >
            OK
          </Button>
        </div>
      </Form>
    )
  }

  render() {
    const { isOpen } = this.state

    return (
      <Modal
        className="paid-uncheck-modal"
        title="Status update, are you really sure?"
        visible={isOpen}
        onCancel={this.close}
      >
        <Formik
          onSubmit={this._onSubmit}
          component={this._renderForm}
        />
      </Modal>
    )
  }
}

export default UpdateToPaidCheckModal
