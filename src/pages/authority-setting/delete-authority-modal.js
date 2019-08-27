import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'

import { actions, TYPES } from '@/store/actions'
import { Modal, Field, Button, Input } from '@/components'
import { forwardInnerRef } from '@/utils/high-order-functions'

@connect(state => ({
  rolesStore: state.roles
}), {
  deleteRole: actions.deleteRole
})
@forwardInnerRef

class DeleteAuthorityModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      authority: {}
    }
  }

  open = (authority = {}) => {
    this.setState({
      isOpen: true,
      authority
    })
  }

  close = () => {
    this.setState({
      isOpen: false,
      authority: {}
    })
  }

  _onSubmit = () => {
    const { authority } = this.state

    this.props.deleteRole({
      id: authority.id
    }, (action) => {
      if (action === TYPES.DELETE_ROLE_SUCCESS) {
        this.close()
      }
    })
  }

  _renderForm = ({ handleSubmit, ...form }) => {
    const { rolesStore } = this.props

    return (
      <Form className="form">
        <div className="field-group">
          <Field
            inline
            readOnly
            form={form}
            name="roleName"
            label="Role name"
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
            loading={rolesStore.submitting === TYPES.DELETE_ROLE_REQUEST}
            onClick={handleSubmit}
          >
            Delete
          </Button>
        </div>
      </Form>
    )
  }

  render() {
    const { isOpen, authority } = this.state

    return (
      <Modal
        className="authority-modal"
        title={authority?.id ? 'Do you want to delete this role?' : 'Please enter a new role below'}
        visible={isOpen}
        onCancel={this.close}
      >
        <Formik
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={authority}
          onSubmit={this._onSubmit}
          component={this._renderForm}
        />
      </Modal>
    )
  }
}

export default DeleteAuthorityModal
