import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import lodash from 'lodash'
import * as Yup from 'yup'

import { actions, TYPES } from '@/store/actions'
import { Modal, Field, Button, Input, CheckboxGroup, RadioGroup } from '@/components'
import { forwardInnerRef } from '@/utils/high-order-functions'

const validationSchema = Yup.object().shape({
  roleName: Yup.string().trim().required()
})

@withLocalize
@connect(state => ({
  rolesStore: state.roles
}), {
  getRoles: actions.getRoles,
  addRole: actions.addRole,
  updateRole: actions.updateRole
})
@forwardInnerRef

class EditAuthorityModal extends Component {
  state = {
    isOpen: false,
    authority: null
  }

  open = (authority) => {
    this.setState({
      isOpen: true,
      authority
    })
  }

  close = () => {
    this.setState({
      isOpen: false,
      authority: null
    })
  }

  _onSubmit = (values, { resetForm }) => {
    const { addRole, updateRole, getRoles } = this.props
    const { authority } = this.state

    const data = {
      roleName: lodash.trim(values.roleName),
      permissions: [{
        table: 'applicationinfos',
        conditions: [{
          field: 'registerSiteName',
          value: values.conditions.registerSite
        }, {
          field: 'businessId',
          value: values.conditions.businessSystem
        }],
        actions: lodash.flatten(lodash.values(values.permissions))
      }]
    }

    if (authority) {
      data.id = authority.id

      updateRole(data, (action) => {
        if (action === TYPES.UPDATE_ROLE_SUCCESS) {
          this.close()
          resetForm()
          getRoles()
        }
      })
    } else {
      addRole(data, (action) => {
        if (action === TYPES.ADD_ROLE_SUCCESS) {
          this.close()
          resetForm()
          getRoles()
        }
      })
    }
  }

  _onPermisstionFieldChange = (e, form, options) => {
    const values = e.target.value.map(item => options.find(option => option.value === item).key)

    if (values.length > 0 && !values.includes('view_and_search')) {
      form.setValues({
        ...form.values,
        permissions: {
          ...form.values.permissions,
          [e.target.name.split('.')[1]]: e.target.value.concat([options.find(item => item.key === 'view_and_search').value])
        }
      })
    }
  }

  _renderPermissionField = (permission, form) => {
    const { translate } = this.props
    const options = permission.list.map(item => ({
      key: item.label.split('.')[3],
      value: item.name,
      name: translate(`authority-setting.authority-modal.permissions.actions.${item.label.split('.')[3]}`)
    }))

    return (
      <Field
        key={permission.no}
        onChange={e => this._onPermisstionFieldChange(e, form, options)}
        form={form}
        name={`permissions.${permission.label.split('.')[2]}`}
        component={CheckboxGroup}
        checkAllLabel={translate(`authority-setting.authority-modal.permissions.${permission.label.split('.')[2]}`)}
        options={options}
      />
    )
  }

  _renderForm = ({ handleSubmit, ...form }) => {
    const { authority } = this.state
    const { rolesStore } = this.props
    const { permissions, businessSystems, registerSites } = rolesStore

    const firstPermisstionsPart = permissions.slice(0, parseInt(permissions.length / 2, 10))
    const secondPermisstionsPart = permissions.slice(parseInt(permissions.length / 2, 10), permissions.length)

    return (
      <Form className="form">
        <div className="field-group">
          <Field
            inline
            form={form}
            name="roleName"
            label="Role name"
            component={Input}
          />
          <div className="row top-row">
            <div className="column">
              <Field
                form={form}
                name="conditions.registerSite"
                label="Register"
                component={RadioGroup}
                options={registerSites.map(({ value, label }) => ({ value, name: label }))}
              />
            </div>
            <div className="column">
              <Field
                form={form}
                name="conditions.businessSystem"
                label="Business System"
                component={RadioGroup}
                options={businessSystems.map(({ value, label }) => ({ value, name: label }))}
              />
            </div>
          </div>
          <div className="divider" />
          <div className="row">
            <div className="column">
              {firstPermisstionsPart.map(item => this._renderPermissionField(item, form))}
            </div>
            <div className="column">
              {secondPermisstionsPart.map(item => this._renderPermissionField(item, form))}
            </div>
          </div>
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
            loading={rolesStore.submitting === TYPES.ADD_ROLE_REQUEST || rolesStore.submitting === TYPES.UPDATE_ROLE_REQUEST}
            onClick={handleSubmit}
          >
            {authority ? 'Update' : 'Add'}
          </Button>
        </div>
      </Form>
    )
  }

  render() {
    const { isOpen, authority } = this.state
    const { rolesStore } = this.props
    const { businessSystems, registerSites } = rolesStore
    let initialValues
    if (authority) {
      const applicationInfos = authority.permissions.find(item => item.table === 'applicationinfos')

      if (applicationInfos) {
        initialValues = {
          roleName: authority.roleName,
          conditions: {
            registerSite: applicationInfos.conditions.find(item => item.field === 'registerSiteName').value,
            businessSystem: applicationInfos.conditions.find(item => item.field === 'businessId').value
          },
          permissions: lodash.reduce(applicationInfos.actions, (result, value) => ({
            ...result,
            [lodash.keys(value)[0].split('.')[2]]: lodash.values(value)[0]
          }), {})
        }
      } else {
        initialValues = {
          roleName: authority.roleName
        }
      }
    } else {
      initialValues = {
        conditions: {
          registerSite: registerSites[0]?.value,
          businessSystem: businessSystems[0]?.value
        }
      }
    }

    return (
      <Modal
        className="authority-modal"
        title={authority ? 'Authorization list' : 'Please enter a new role below'}
        visible={isOpen}
        onCancel={this.close}
        width={1000}
      >
        <Formik
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={this._onSubmit}
          component={this._renderForm}
        />
      </Modal>
    )
  }
}

export default EditAuthorityModal
