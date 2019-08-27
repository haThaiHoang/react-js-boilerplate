import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import lodash from 'lodash'
import moment from 'moment'
import { withLocalize } from 'react-localize-redux'
import { Popconfirm } from 'antd'
import * as Yup from 'yup'

import Misc from '@/utils/misc'
import { actions, TYPES } from '@/store/actions'
import { forwardInnerRef } from '@/utils/high-order-functions'
import {
  Modal,
  Button,
  Field,
  Input,
  Select,
  DatePicker,
  ImagePicker,
  Checkbox,
  ReadBox,
  ImageViewer
} from '@/components'

const UPDATE_LEVEL = {
  LOW: 1,
  MEDIUM: 2,
  HIGHT: 3
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required(),
  middleName: Yup.string().trim(),
  lastName: Yup.string().trim().required(),
  email: Yup.string().email().required(),
  mobilePhoneNumber: Yup.string().required()
})

@withLocalize
@connect(state => ({
  applicationStore: state.application,
  accountStore: state.account
}), {
  getCountries: actions.getCountries,
  updateApplication: actions.updateApplication,
  moveApplications: actions.moveApplications,
  getBusinessSystem: actions.getBusinessSystem,
  getSendMailLog: actions.getSendMailLog,
  sendMailWrongPassport: actions.sendMailWrongPassport
})
@forwardInnerRef

class UpdateApplicationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      isDisabledButtonUpdate: true,
      application: null
    }

    this._checked = false
  }

  open = (application, applicationType) => {
    const { accountStore: { permissions } } = this.props
    let buttonPermissions = []

    switch (applicationType) {
      case 'paid-unchecked':
        buttonPermissions = [
          'EDIT_APPLICATION_BY_STATUS_PAID_UNCHECKED',
          'UPDATE_STATUS_PAID_UNCHECKED_TO_RE_CONFIRM_PAID_UNCHECKED',
          'UPDATE_STATUS_PAID_UNCHECKED_TO_REJECT'
        ]
        break
      case 'reconfirm-paid-unchecked':
        buttonPermissions = [
          'EDIT_APPLICATION_BY_STATUS_RE_CONFIRM_PAID_UNCHECKED',
          '',
          'UPDATE_STATUS_RE_CONFIRM_PAID_UNCHECKED_TO_REJECT'
        ]
        break
      case 'reconfirm-paid-checked':
        buttonPermissions = [
          'EDIT_APPLICATION_BY_STATUS_RE_CONFIRM_PAID_CHECKED',
          '',
          'UPDATE_STATUS_RE_CONFIRM_PAID_CHECKED_TO_REJECT'
        ]
        break
      case 'reconfirm-input-card-information':
        buttonPermissions = [
          'EDIT_APPLICATION_BY_STATUS_RE_CONFIRM_INPUT_CARD_INFORMATION',
          '',
          'UPDATE_STATUS_RE_CONFIRM_INPUT_CARD_INFORMATION_TO_REJECT'
        ]
        break
      case 'paid-checked':
        buttonPermissions = [
          'EDIT_APPLICATION_BY_STATUS_PAID_CHECKED',
          'UPDATE_STATUS_PAID_CHECKED_TO_RE_CONFIRM_PAID_CHECKED',
          'UPDATE_STATUS_PAID_CHECKED_TO_REJECT'
        ]
        break
      default:
    }

    buttonPermissions = buttonPermissions.map(item => permissions.includes(item))

    this.setState({
      isOpen: true,
      isDisabledButtonUpdate: true,
      application,
      applicationType,
      buttonPermissions,
      updateLevel: applicationType === 'paid-unchecked' ? UPDATE_LEVEL.MEDIUM
        : applicationType === 'paid-checked' ? UPDATE_LEVEL.LOW
          : UPDATE_LEVEL.HIGHT
    })

    this._checked = false
    this.props.getCountries()
    this.props.getBusinessSystem()
    if (applicationType !== 'paid-unchecked' && applicationType !== 'paid-checked') {
      this.props.getSendMailLog({
        id: application.id
      })
    }
  }

  close = () => {
    this.setState({
      isOpen: false
    })
  }

  _onSendMaiButtonClick = typeMail => () => {
    const { accountStore, sendMailWrongPassport } = this.props
    const { application } = this.state

    sendMailWrongPassport({
      id: application.id,
      typeMail,
      userCode: accountStore.userCode
    })
  }

  _onMoveApplications = (moveType) => {
    const { applicationType } = this.state

    let type
    if (moveType === 'reject') {
      this._reject = true
      type = `${applicationType}-to-reject`
    } else {
      this._reject = false
      type = `${applicationType}-to-reconfirm-${applicationType}`
    }

    this.props.moveApplications({
      type,
      ids: [{
        id: this.state.application.id
      }]
    }, (action) => {
      if (action === TYPES.MOVE_APPLICATIONS_SUCCESS) {
        this.close()
      }
    })
  }

  _onSubmit = (values) => {
    const { applicationStore } = this.props
    const { applicationType } = this.state

    let pickFields = []
    let data = { ...values }

    if (applicationType === 'paid-unchecked') {
      pickFields = [
        'type',
        'id',
        'title',
        'firstName',
        'lastName',
        'middleName',
        'gender',
        'dateOfBirth',
        'mobilePhoneNumber',
        'email',
        'note',
        'isChecked',
        'nationalityCode'
      ]
    } else if (applicationType === 'paid-checked') {
      pickFields = [
        'id',
        'type',
        'note',
        'isChecked'
      ]
    } else {
      pickFields = [
        'type',
        'id',
        'title',
        'firstName',
        'lastName',
        'middleName',
        'gender',
        'dateOfBirth',
        'nationalityCode',
        'passportNumber',
        'passportExpiredDate',
        'passportImage',
        'mobilePhoneNumber',
        'countryCode',
        'postalCode',
        'region',
        'city',
        'address',
        'buildingName',
        'note',
        'isChecked'
      ]
    }

    data.passportImage = data.passportImage.file
    data.type = applicationType
    data.isChecked = this._checked
    data.nationalityCode = applicationStore.countries.find(item => item.id === values.nationality).countryCode
    data.countryCode = applicationStore.countries.find(item => item.id === values.country).countryCode
    data.dateOfBirth = moment(data.dateOfBirth).format('YYYY-MM-DD')
    data = Misc.trimObjectProperties(data, ['middleName'])

    data = lodash.pick(data, pickFields)

    this.props.updateApplication(data, (action) => {
      if (action === TYPES.UPDATE_APPLICATION_SUCCESS) {
        this.close()
      }
    })
  }

  _onCustomValidate = (values) => {
    const errors = {}

    const nameFields = ['firstName', 'middleName', 'lastName']
    nameFields.forEach((field) => {
      if (lodash.trim(values[field]) && !values[field].match(/(^[A-Z]+$)/g)) {
        errors[field] = 'uppercase-characters'
      }
    })

    return errors
  }

  _onCheckedChange = (e) => {
    this.setState({
      isDisabledButtonUpdate: !e.target.checked
    })
  }

  _renderPopoverConfirm = (onConfirm, content) => (
    <Popconfirm
      title={<>Are you sure?<br /> Please confirm again.</>}
      onConfirm={onConfirm}
      okText="Yes"
      icon={null}
      cancelText="Cancel"
    >
      {content}
    </Popconfirm>
  )

  _renderForm = ({ handleSubmit, ...form }) => {
    const { isDisabledButtonUpdate, updateLevel, buttonPermissions } = this.state
    const { translate, applicationStore } = this.props

    const nationality = applicationStore.countries.filter(item => item.isAllowNationality)
    const countries = applicationStore.countries.filter(item => item.isAllowCountry)
    const titles = lodash.range(5).map(index => ({
      name: translate(`authority-setting.update-application-modal.fields.field-5-options.option-${index + 1}`),
      value: index.toString()
    }))
    const genders = lodash.range(3).map(index => ({
      name: translate(`authority-setting.update-application-modal.fields.field-4-options.option-${index + 1}`),
      value: index.toString()
    }))
    const familyStatuses = lodash.range(3).map(index => ({
      name: translate(`authority-setting.update-application-modal.fields.field-22-options.option-${index + 1}`),
      value: index.toString()
    }))

    return (
      <div className="horizontal-box">
        <Form className="form">
          <div className="divider">
            Certificate information
          </div>
          <div className="field-group">
            <Field
              inline
              simple
              form={form}
              readOnly={updateLevel === UPDATE_LEVEL.LOW}
              name="firstName"
              label="Given Name"
              component={Input}
            />
            <Field
              inline
              simple
              form={form}
              readOnly={updateLevel === UPDATE_LEVEL.LOW}
              name="middleName"
              label="Middle Name"
              component={Input}
            />
            <Field
              inline
              simple
              form={form}
              readOnly={updateLevel === UPDATE_LEVEL.LOW}
              name="lastName"
              label="Family Name"
              component={Input}
            />
            <Field
              inline
              simple
              disabled={updateLevel === UPDATE_LEVEL.LOW}
              form={form}
              name="gender"
              label="Gender"
              component={Select}
              options={genders}
            />
            <Field
              inline
              simple
              disabled={updateLevel === UPDATE_LEVEL.LOW}
              form={form}
              name="title"
              label="Title"
              component={Select}
              options={titles}
            />
            <Field
              inline
              simple
              disabled={updateLevel === UPDATE_LEVEL.LOW}
              form={form}
              name="dateOfBirth"
              label="Birthday"
              component={DatePicker}
            />
            <Field
              inline
              simple
              showSearch
              disabled={updateLevel === UPDATE_LEVEL.LOW}
              form={form}
              name="nationality"
              label="Nationality"
              component={Select}
              options={nationality}
              optionFilterProp="name"
              optionBinding={{
                name: 'countryName',
                value: 'id'
              }}
            />
            <Field
              inline
              simple
              readOnly={updateLevel !== UPDATE_LEVEL.HIGHT}
              form={form}
              name="passportNumber"
              label="Passport Number"
              component={Input}
            />
            <Field
              inline
              simple
              disabled={updateLevel !== UPDATE_LEVEL.HIGHT}
              form={form}
              name="passportExpiredDate"
              label="Passport of Expiry"
              component={DatePicker}
            />
            <Field
              inline
              form={form}
              readOnly={updateLevel !== UPDATE_LEVEL.HIGHT}
              name="passportImage"
              label="Passport Image Upload"
              component={ImagePicker}
            />
            {updateLevel === UPDATE_LEVEL.HIGHT && (
              <>
                <div className="passport-action-box">
                  {this._renderPopoverConfirm(this._onSendMaiButtonClick('WRONG_PASSPORT_EXPIRED'), (
                    <Button
                      size="small"
                      loading={applicationStore.submitting === `${TYPES.SEND_MAIL_WRONG_PASSPORT_REQUEST}WRONG_PASSPORT_EXPIRED`}
                    >
                      Wrong passport expired
                    </Button>
                  ))}
                  {this._renderPopoverConfirm(this._onSendMaiButtonClick('BLUR_PASSPORT'), (
                    <Button
                      size="small"
                      loading={applicationStore.submitting === `${TYPES.SEND_MAIL_WRONG_PASSPORT_REQUEST}BLUR_PASSPORT`}
                    >
                      Blur passport
                    </Button>
                  ))}
                </div>
                <Field
                  inline
                  form={form}
                  label="Send log"
                  name="send-log"
                  component={() => (
                    <div className="send-log-box">
                      {applicationStore.sendMailLogs.map((item, index) => (
                        <p key={index}><span>{moment(item.createdAt).format('YYYY-MM-DD')}</span> - {item.type}</p>
                      ))}
                    </div>
                  )}
                />
              </>
            )}
          </div>
          <div className="divider">
            Address & Telephone
          </div>
          <div className="field-group">
            <Field
              inline
              simple
              readOnly={updateLevel === UPDATE_LEVEL.LOW}
              form={form}
              name="mobilePhoneNumber"
              label="Mobile Phone Number"
              component={Input}
            />
            <Field
              inline
              simple
              showSearch
              disabled={updateLevel !== UPDATE_LEVEL.HIGHT}
              form={form}
              name="country"
              label="Country"
              component={Select}
              options={countries}
              optionFilterProp="name"
              optionBinding={{
                name: 'countryName',
                value: 'id'
              }}
            />
            <Field
              inline
              simple
              readOnly={updateLevel !== UPDATE_LEVEL.HIGHT}
              form={form}
              name="address"
              label="Address"
              component={Input}
            />
            <Field
              inline
              simple
              readOnly={updateLevel !== UPDATE_LEVEL.HIGHT}
              form={form}
              name="buildingName"
              label="Building name"
              component={Input}
            />
            <Field
              inline
              simple
              readOnly={updateLevel !== UPDATE_LEVEL.HIGHT}
              form={form}
              name="city"
              label="City"
              component={Input}
            />
            <Field
              inline
              simple
              readOnly={updateLevel !== UPDATE_LEVEL.HIGHT}
              form={form}
              name="region"
              label="Region"
              component={Input}
            />
            <Field
              inline
              simple
              readOnly={updateLevel !== UPDATE_LEVEL.HIGHT}
              form={form}
              name="postalCode"
              label="Postal Code"
              component={Input}
            />
          </div>
          <div className="divider">
            Other
          </div>
          <div className="field-group">
            <Field
              inline
              simple
              readOnly
              form={form}
              name="registerSiteName"
              label="Registered Site"
              component={Input}
            />
            <Field
              inline
              simple
              readOnly
              form={form}
              name="businessSystems.name"
              label="Business Name"
              component={Input}
            />
            <Field
              inline
              simple
              readOnly
              form={form}
              name="currencies.name"
              label="Currency"
              component={Input}
            />
            <Field
              inline
              simple
              readOnly={updateLevel !== UPDATE_LEVEL.MEDIUM}
              form={form}
              name="email"
              label="Email"
              component={Input}
            />
            <Field
              inline
              simple
              disabled
              form={form}
              name="familyStatus"
              label="Family Status"
              component={Select}
              options={familyStatuses}
            />
          </div>
          <div className="divider">
            Note for Admin
          </div>
          <div className="field-group">
            <Field
              inline
              simple
              form={form}
              name="note"
              label="Note"
              component={Input}
            />
            <Field
              inline
              simple
              readOnly
              form={form}
              name="checkedUpdateTime"
              label="Checked Time"
              component={Input}
            />
          </div>
          <div className="action-box">
            <div className="row">
              {buttonPermissions[0] && this._renderPopoverConfirm(
                () => {
                  this._checked = false
                  handleSubmit()
                },
                <Button
                  size="small"
                  htmlType="submit"
                  type="primary"
                  loading={
                    applicationStore.submitting === TYPES.UPDATE_APPLICATION_REQUEST
                    && this._checked === false
                  }
                >
                  Update
                </Button>
              )}
              {buttonPermissions[1] && this._renderPopoverConfirm(
                () => this._onMoveApplications('reconfirm'),
                <Button
                  size="small"
                  type="primary"
                  loading={
                    applicationStore.submitting === TYPES.MOVE_APPLICATIONS_REQUEST
                    && this._reject === false
                  }
                >
                  Move to Reconfirm List
                </Button>
              )}
              {buttonPermissions[2] && this._renderPopoverConfirm(
                () => this._onMoveApplications('reject'),
                <Button
                  size="small"
                  type="primary"
                  loading={
                    applicationStore.submitting === TYPES.MOVE_APPLICATIONS_REQUEST
                    && this._reject === true
                  }
                >
                  Reject or Cancel
                </Button>
              )}
            </div>
            <div className="row">
              <Button
                type="basic"
                onClick={this.close}
              >
                Cancel
              </Button>
              {buttonPermissions[0] && this._renderPopoverConfirm(
                () => {
                  this._checked = true
                  handleSubmit()
                },
                <Button
                  disabled={isDisabledButtonUpdate}
                  loading={
                    applicationStore.submitting === TYPES.UPDATE_APPLICATION_REQUEST
                    && this._checked === true
                  }
                >
                  Update and Checked
                </Button>
              )}
            </div>
            <div className="row">
              <Checkbox
                checked={!isDisabledButtonUpdate}
                onChange={this._onCheckedChange}
              >
                I checked all the items
              </Checkbox>
            </div>
          </div>
        </Form>
        <div className="passport-view-box">
          <ImageViewer
            src={form.values.passportImage.showFile}
          />
        </div>
      </div>
    )
  }

  render() {
    const { isOpen, application } = this.state

    const initialValues = application ? {
      ...application,
      title: application.title.toString(),
      gender: application.gender.toString(),
      familyStatus: application.familyStatus.toString(),
      nationality: application.nationality.id,
      country: application.country.id,
      businessSystems: application.businessSystems,
      checkedUpdateTime: application.checkedUpdateTime && moment(application.checkedUpdateTime).format('YYYY-MM-DD HH:mm:ss'),
      passportImage: {
        showFile: application.linkPassportImage
      }
    } : {}

    return (
      <Modal
        destroyOnClose
        className="update-application-modal"
        title="Update Application"
        visible={isOpen}
        onCancel={this.close}
        width={1200}
        bodyStyle={{
          height: 'calc(100vh - 180px)',
          padding: 0
        }}
      >
        <Formik
          enableReinitialize
          validate={this._onCustomValidate}
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

export default UpdateApplicationModal
