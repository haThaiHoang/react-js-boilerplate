import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'

import { Modal, Field, Button, Input } from '@/components'
import { actions, TYPES } from '@/store/actions'
import { forwardInnerRef } from '@/utils/high-order-functions'

@connect(state => ({
  adminStore: state.admin
}), {
  deleteAdmin: actions.deleteAdmin
})
@forwardInnerRef
class DeleteMemberModal extends Component {
  state = {
    isOpen: false,
    member: null
  }

  open = (member) => {
    this.setState({
      isOpen: true,
      member
    })
  }

  close = () => {
    this.setState({
      isOpen: false,
      member: null
    })
  }

  _onSubmit = () => {
    const { member } = this.state
    const { deleteAdmin } = this.props
    const payload = { id: member.id }

    deleteAdmin(payload, (action) => {
      if (action === TYPES.DELETE_ADMIN_SUCCESS) {
        this.close()
      }
    })
  }

  _renderForm = ({ handleSubmit, ...form }) => {
    const { adminStore } = this.props

    return (
      <Form className="form">
        <div className="field-group">
          <Field
            inline
            readOnly
            form={form}
            name="userCode"
            label="Code"
            component={Input}
          />
        </div>
        <div className="action-box">
          <Button
            type="basic"
            onClick={this.close}
          >
            Close
          </Button>
          <Button
            htmlType="submit"
            type="danger"
            onClick={handleSubmit}
            loading={adminStore?.submitting === TYPES.DELETE_ADMIN_REQUEST}
          >
            Delete
          </Button>
        </div>
      </Form>
    )
  }

  render() {
    const { isOpen, member } = this.state

    return (
      <Modal
        className="member-modal"
        title="Do you want to delete this member"
        visible={isOpen}
        onCancel={this.close}
      >
        <Formik
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={member}
          onSubmit={this._onSubmit}
          component={this._renderForm}
        />
      </Modal>
    )
  }
}

export default DeleteMemberModal
