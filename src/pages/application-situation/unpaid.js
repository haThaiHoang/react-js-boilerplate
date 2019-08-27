import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Misc from '@/utils/misc'
import { actions, TYPES } from '@/store/actions'
import { Table, PaginationBar, Column } from '@/components'

const getDateFormat = timestamp => moment(timestamp).format('YYYY-MM-DD')

@connect(state => ({
  applicationStore: state.application
}), {
  getApplications: actions.getApplications,
  resetApplicationStore: actions.resetApplicationStore
})

class Unpaid extends Component {
  constructor(props) {
    super(props)

    this._columns = [{
      title: 'No',
      align: 'center',
      width: 60,
      dataIndex: 'no',
      key: 'no',
      render: (cell, record, index) => index + 1
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
      registerSiteName: ''
    })
  }

  componentWillUnmount() {
    const { resetApplicationStore } = this.props
    resetApplicationStore()
  }

  _onSortChange = (pagination, filters, sorter) => {
    if (sorter?.columnKey === 'createdAt') {
      const sort = sorter.order === 'descend' ? 'DESC' : ''

      this._getApplications({ sort })
    }
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
      type: 'unpaid'
    }
    delete payload.totalDoc
    delete payload.isChecked

    payload = Misc.objectRemoveBlank(payload)
    getApplications(payload)
  }

  render() {
    const { applicationStore } = this.props

    return (
      <div className="unpaid">
        <div className="top-action-box">
          <PaginationBar
            current={applicationStore.params.pageNo}
            total={applicationStore.params.totalDoc}
            onChange={this._onPaginationBarChange}
            pageSize={applicationStore.params.totalData}
          />
        </div>
        <Table
          loading={applicationStore.submitting === TYPES.GET_APPLICATIONS_REQUEST}
          rowKey={(row, index) => index}
          columns={this._columns}
          dataSource={applicationStore.applications}
          scroll={{ x: 2100, y: 'calc(100vh - 270px)' }}
          onChange={this._onSortChange}
        />
      </div>
    )
  }
}

export default Unpaid
