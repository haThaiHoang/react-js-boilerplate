import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import lodash from 'lodash'
import { connect } from 'react-redux'

import { Modal, Field, Button, Input, Select } from 'app/components'
import { actions, TYPES } from 'app/store/actions'
import { forwardInnerRef } from 'app/utils/high-order-functions'

const ADMIN_STATUS = [
  { value: 'ACTIVE', name: 'ACTIVE' },
  { value: 'BLOCK', name: 'BLOCK' }
]

const validationSchema = (update) => {
  const shapeObject = {
    adminName: Yup.string().trim().required(),
    email: Yup.string()
      .required()
      .matches(new RegExp('^[a-zA-Z0-9_\.]{1,99}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$'), 'validation.email'),
    roleId: Yup.string().required(),
    password: Yup.string().required(),
    status: Yup.string().required()
  }
  if (update) delete shapeObject.password
  return Yup.object().shape(shapeObject)
}

@connect(state => ({
  rolesStore: state.roles,
  adminStore: state.admin
}), {
  getRoles: actions.getRoles,
  addSubAdmin: actions.addSubAdmin,
  updateAdmin: actions.updateAdmin
})
@forwardInnerRef
class EditMemberModal extends Component {
  state = {
    isOpen: false,
    member: null
  }

  componentDidMount() {
    const { getRoles } = this.props
    getRoles()
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

  _onSubmit = (values) => {
    const { member } = this.state
    const { addSubAdmin, updateAdmin } = this.props
    const payload = {
      adminName: lodash.trim(values.adminName),
      email: values.email,
      roleId: values.roleId,
      password: values.password,
      status: values.status
    }

    if (member?.id) {
      delete payload.password
      payload.id = member.id
      updateAdmin(payload, (action) => {
        if (action === TYPES.UPDATE_ADMIN_SUCCESS) {
          this.close()
        }
      })
      return
    }
    addSubAdmin(payload, (action) => {
      if (action === TYPES.ADD_SUB_ADMIN_SUCCESS) {
        this.close()
      }
    })
  }

  _renderForm = ({ handleSubmit, ...form }) => {
    const { member } = this.state
    const { rolesStore: { roles }, adminStore } = this.props

    const loading = adminStore.submitting === TYPES.ADD_SUB_ADMIN_REQUEST
    || adminStore.submitting === TYPES.UPDATE_ADMIN_REQUEST

    return (
      <Form className="form">
        <div className="field-group">
          <Field
            inline
            form={form}
            name="userCode"
            label="Code"
            readOnly
            component={Input}
          />
          <Field
            inline
            form={form}
            name="adminName"
            label="Name"
            component={Input}
          />
          <Field
            inline
            form={form}
            name="email"
            label="Mail address"
            component={Input}
          />
          <Field
            inline
            form={form}
            name="password"
            readOnly={!!member?.id}
            label="Password"
            type="password"
            component={Input}
          />
          <Field
            inline
            form={form}
            name="roleId"
            label="Roll"
            component={Select}
            options={roles}
            optionBinding={{
              name: 'roleName',
              value: 'id'
            }}
          />
          <Field
            inline
            form={form}
            name="status"
            label="Status"
            component={Select}
            options={ADMIN_STATUS}
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
            onClick={handleSubmit}
            loading={loading}
          >
            {member?.id ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form>
    )
  }

  render() {
    const { isOpen, member } = this.state
    const initialValues = member || {
      id: '',
      name: '',
      mail: '',
      password: '',
      roll: '',
      status: ''
    }

    return (
      <Modal
        className="member-modal"
        title={member?.id ? 'Update member information' : 'Create a new member'}
        visible={isOpen}
        onCancel={this.close}
      >
        <Formik
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={validationSchema(member?.id)}
          onSubmit={this._onSubmit}
          component={this._renderForm}
        />
      </Modal>
    )
  }
}

export default EditMemberModal
