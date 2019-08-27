import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { Popconfirm } from 'antd'

import { forwardInnerRef } from '@/utils/high-order-functions'
import { Modal, Button } from '@/components'
import { actions, TYPES } from '@/store/actions'

@connect(state => ({
  applicationStore: state.application
}), {
  moveApplications: actions.moveApplications
})
@forwardInnerRef
class CsvDownloadModal extends Component {
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

  _renderPopoverConfirm = (onConfirm, content) => (
    <Popconfirm
      title={<>Update status to input card information.<br /> Are you really sure?</>}
      onConfirm={onConfirm}
      okText="Yes"
      icon={null}
      cancelText="Cancel"
    >
      {content}
    </Popconfirm>
  )

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
          {this._renderPopoverConfirm(
            handleSubmit,
            <Button
              type="primary"
              loading={applicationStore?.submitting === TYPES.MOVE_APPLICATIONS_REQUEST}
            >
              Yes
            </Button>
          )}
        </div>
      </Form>
    )
  }

  render() {
    const { isOpen } = this.state

    return (
      <Modal
        className="paid-uncheck-modal"
        title="Application export csv, are your really sure?"
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

export default CsvDownloadModal
