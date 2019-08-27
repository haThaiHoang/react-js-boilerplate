import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Icon } from 'antd'
import moment from 'moment'
import cx from 'classnames'

import Misc from 'app/utils/misc'
import { actions, TYPES } from 'app/store/actions'
import { CHECK_STATUS, CHECK_STATUS_OPTIONS } from 'app/constants'
import { Table, PaginationBar, Button, Select, Column } from 'app/components'
import UpdateToPaidCheckModal from './update-to-paid-check-modal'
import UpdateApplicationModal from './update-application-modal'

const getDateFormat = timestamp => moment(timestamp).format('YYYY-MM-DD')

@connect(state => ({
  accountStore: state.account,
  applicationStore: state.application
}), {
  getApplications: actions.getApplications,
  resetApplicationStore: actions.resetApplicationStore,
  setApplicationStoreParams: actions.setApplicationStoreParams
})

class PaidUnchecked extends Component {
  constructor(props) {
    super(props)

    this._columns = [{
      title: 'No',
      align: 'center',
      width: 60,
      dataIndex: 'no',
      key: 'no',
      render: (cell, record, index) => index + 1
    }, {
      title: '',
      width: 60,
      align: 'center',
      dataIndex: 'isChecked',
      key: 'isChecked',
      render: (cell, record) => {
        if (!record.isChecked) return null
        const { applicationStore: { check: { checkRows } } } = this.props
        const isCheckRow = checkRows.some(item => item === record.id)
        return (
          <Checkbox
            checked={isCheckRow}
            onChange={e => this._onChangeCheckboxRow(e, record)}
          />
        )
      }
    }, {
      title: 'Action',
      width: 100,
      align: 'center',
      dataIndex: 'action',
      key: 'action',
      render: (cell, record) => (
        <Icon
          onClick={() => this._updateApplicationModal.open(record, 'paid-unchecked')}
          className="cell-edit-button"
          type="edit"
          theme="filled"
        />
      )
    }, {
      title: 'Checked',
      align: 'center',
      dataIndex: 'checked',
      key: 'checked',
      width: 120,
      render: (cell, record) => {
        if (record.isChecked) {
          return <span className="is-check checked">Checked</span>
        }
        return <span className="is-check not-check">Not check</span>
      }
    }, Column({
      key: 'systemId',
      width: 360,
      data: [
        { title: 'SystemID', value: 'systemId' },
        { title: 'MemberID', value: 'memberId' }
      ]
    }), Column({
      key: 'givenName',
      width: 170,
      data: [
        { title: 'GivenName', value: 'firstName' },
        { title: 'FamilyName', value: 'lastName' }
      ]
    }), Column({
      key: 'passportNumber',
      width: 200,
      data: [
        { title: 'PassportNumber', value: 'passportNumber' },
        { title: 'Nationality', value: 'nationality.name' }
      ]
    }), Column({
      key: 'experiod',
      width: 200,
      data: [
        { title: 'Experiod', value: 'passportExpiredDate', process: getDateFormat },
        { title: 'Period', value: 'passportExpiredDate', process: Misc.getPeriod }
      ]
    }), Column({
      key: 'gender',
      width: 190,
      data: [
        { title: 'Gender', value: 'gender', process: Misc.getGender },
        { title: 'Birthday', value: 'dateOfBirth', process: getDateFormat }
      ]
    }), Column({
      key: 'address',
      width: 350,
      data: [{ title: 'Address', value: 'address' }]
    }), Column({
      key: 'createdAt',
      width: 150,
      data: [{ title: 'Created At', value: 'createdAt', process: getDateFormat }],
      defaultSortOrder: 'ascend',
      sorter: true
    }), Column({
      key: 'email',
      width: 200,
      data: [
        { title: 'Email', value: 'email' },
        { title: 'Currency', value: 'currencies.name' }
      ]
    }), Column({
      key: 'business',
      data: [
        { title: 'Business', value: 'businessSystems.name' },
        { title: 'RegisterSite', value: 'registerSiteName' }
      ]
    })]
  }

  componentDidMount() {
    this._getApplications({
      pageNo: 1,
      totalData: 100,
      sort: '',
      paramSearch: '',
      businessId: '',
      registerSiteName: '',
      isChecked: CHECK_STATUS.ALL.value
    })
  }

  componentWillUnmount() {
    const { resetApplicationStore } = this.props
    resetApplicationStore()
  }

  _onPaginationBarChange = (type, value) => {
    if (type === 'page') {
      this._getApplications({ pageNo: value })
    } else {
      this._getApplications({ pageNo: 1, totalData: value })
    }
  }

  _getApplications = (newParams) => {
    const { getApplications, applicationStore: { params } } = this.props

    let payload = {
      ...params,
      ...newParams,
      type: 'paid-uncheck'
    }
    delete payload.totalDoc

    payload = Misc.objectRemoveBlank(payload)
    switch (payload.isChecked) {
      case CHECK_STATUS.CHECKED.value:
        payload.isChecked = true
        break
      case CHECK_STATUS.NOT_CHECK.value:
        payload.isChecked = false
        break
      default:
        delete payload.isChecked
    }

    getApplications(payload)
  }

  _onCheckAllChange = (e) => {
    const { applicationStore: { applications }, setApplicationStoreParams } = this.props
    const checkAll = e.target.checked
    const checkRows = []
    if (checkAll) {
      applications.forEach((application) => {
        if (application?.isChecked) {
          checkRows.push(application.id)
        }
      })
    }
    setApplicationStoreParams({
      checkAll,
      checkRows,
      indeterminateCheckAll: false,
      type: 'check'
    })
  }

  _onChangeCheckboxRow = (e, record) => {
    const { applicationStore: { applications, check: { checkRows } }, setApplicationStoreParams } = this.props
    let newCheckRows = [...checkRows]
    let indeterminateCheckAll = false
    let checkAll = false

    if (e.target.checked) {
      newCheckRows.push(record.id)
    } else {
      const indexRemove = newCheckRows.findIndex(item => item === record.id)
      newCheckRows.splice(indexRemove, 1)
    }

    const checkedApplications = applications.filter(item => item.isChecked)
    if (newCheckRows.length) {
      indeterminateCheckAll = newCheckRows.length < checkedApplications.length
      checkAll = newCheckRows.length === checkedApplications.length
    }
    setApplicationStoreParams({
      checkRows: newCheckRows,
      indeterminateCheckAll,
      checkAll,
      type: 'check'
    })
  }

  _handleTableChange = (pagination, filters, sorter) => {
    if (sorter?.columnKey === 'createdAt') {
      const sort = sorter.order === 'descend' ? 'DESC' : ''
      this._getApplications({ sort })
    }
  };

  _renderOptionCheck = ({ value, name }) => (
    <>
      <span
        className={cx(
          value === CHECK_STATUS.CHECKED.value && 'checked',
          value === CHECK_STATUS.NOT_CHECK.value && 'not-check',
          'option-check'
        )}
      />
      {name}
    </>
  )

  render() {
    let { accountStore: { permissions }, applicationStore } = this.props
    const { check: { checkAll, indeterminateCheckAll, checkRows } } = applicationStore
    let columns = this._columns

    if (!permissions.includes('EDIT_APPLICATION_BY_STATUS_PAID_UNCHECKED')) {
      columns = columns.filter(item => item.key !== 'action')
    }

    if (!permissions.includes('UPDATE_STATUS_PAID_UNCHECKED_TO_PAID_CHECKED')) {
      columns = columns.filter(item => item.key !== 'isChecked')
    }

    return (
      <div className="paid-uncheck">
        <div className="top-action-box">
          <div className="button-group">
            <PaginationBar
              current={applicationStore.params.pageNo}
              total={applicationStore.params.totalDoc}
              onChange={this._onPaginationBarChange}
              pageSize={applicationStore.params.totalData}
            />
            <Select
              size="small"
              className="search-type"
              options={CHECK_STATUS_OPTIONS}
              modern
              value={applicationStore.params.isChecked}
              onChange={e => this._getApplications({ pageNo: 1, isChecked: e.target.value })}
              name="isChecked"
              style={{ width: 140 }}
              renderOption={this._renderOptionCheck}
            />
          </div>
          {permissions.includes('UPDATE_STATUS_PAID_UNCHECKED_TO_PAID_CHECKED') && (
            <div className="button-group">
              <Checkbox
                onChange={this._onCheckAllChange}
                checked={checkAll}
                indeterminate={indeterminateCheckAll}
              >
                Check all
              </Checkbox>
              <Button
                type="primary"
                size="small"
                onClick={() => { this._updateToPaidCheckModal.open() }}
                disabled={checkRows.length === 0}
              >
                Update to paid checked
              </Button>
            </div>
          )}
        </div>
        <Table
          loading={applicationStore.submitting === TYPES.GET_APPLICATIONS_REQUEST}
          rowKey={(row, index) => index}
          columns={columns}
          dataSource={applicationStore.applications}
          scroll={{ x: 2400, y: 'calc(100vh - 270px)' }}
          onChange={this._handleTableChange}
        />
        <UpdateToPaidCheckModal
          innerRef={(ref) => { this._updateToPaidCheckModal = ref }}
          checkedApplicationIds={checkRows}
          callbackSuccess={() => this._onCheckAllChange({ target: { checked: false } })}
          type="paid-unchecked-to-paid-checked"
        />
        <UpdateApplicationModal
          innerRef={(ref) => { this._updateApplicationModal = ref }}
        />
      </div>
    )
  }
}

export default PaidUnchecked
