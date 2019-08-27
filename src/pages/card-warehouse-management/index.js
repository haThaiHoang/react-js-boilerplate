import React, { Component } from 'react'
import { Icon } from 'antd'
import './style.scss'

import { Page, Container, Table, PaginationBar, Button, Select, Input, Checkbox } from '@/components'
import ImportCardModal from './import-card-modal'
import ChangeCardModal from './change-card-modal'

class CardWarehouseManagement extends Component {
  constructor(props) {
    super(props)

    this._columns = [{
      title: 'No',
      align: 'center',
      dataIndex: 'no',
      key: 'no',
      render: (cell, record, index) => index + 1
    }, {
      title: 'Edit',
      align: 'center',
      dataIndex: 'edit',
      key: 'edit',
      render: () => (
        <Icon
          className="cell-edit-button"
          type="edit"
          theme="filled"
        />
      )
    }, {
      title: 'Card Number',
      align: 'center',
      dataIndex: 'cardNumber',
      key: 'cardNumber'
    }, {
      title: 'Expire date',
      align: 'center',
      dataIndex: 'expireDate',
      key: 'expireDate'
    }, {
      title: 'Imported Date',
      align: 'center',
      dataIndex: 'importedDate',
      key: 'importedDate'
    }, {
      title: 'Status',
      align: 'center',
      dataIndex: 'status',
      key: 'status',
      render: row => (row ? (
        <Icon
          type="check-circle"
          className="status-icon check"
        />
      ) : (
        <Icon
          type="close-circle"
          className="status-icon uncheck"
        />
      ))
    }, {
      title: 'Note',
      align: 'center',
      dataIndex: 'note',
      key: 'note'
    }]

    this.state = {
      name: props.match.params.name,
      selectedRowKeys: []
    }
  }

  _onClick = () => {
    const { history } = this.props

    history.push('/')
  }

  render() {
    const { selectedRowKeys, name } = this.state

    const data = [{
      key: 1,
      cardNumber: '8621 4855 3751 6405',
      expireDate: '11/16',
      importedDate: '2019-03-21 09:14:19 +07:00',
      status: true,
      note: 'Active'
    }, {
      key: 2,
      cardNumber: '8621 4855 3751 6405',
      expireDate: '11/16',
      importedDate: '2019-03-21 09:14:19 +07:00',
      status: false,
      note: 'Active'
    }, {
      key: 1,
      cardNumber: '8621 4855 3751 6405',
      expireDate: '11/16',
      importedDate: '2019-03-21 09:14:19 +07:00',
      status: true,
      note: 'Active'
    }, {
      key: 2,
      cardNumber: '8621 4855 3751 6405',
      expireDate: '11/16',
      importedDate: '2019-03-21 09:14:19 +07:00',
      status: false,
      note: 'Active'
    }, {
      key: 1,
      cardNumber: '8621 4855 3751 6405',
      expireDate: '11/16',
      importedDate: '2019-03-21 09:14:19 +07:00',
      status: true,
      note: 'Active'
    }, {
      key: 2,
      cardNumber: '8621 4855 3751 6405',
      expireDate: '11/16',
      importedDate: '2019-03-21 09:14:19 +07:00',
      status: false,
      note: 'Active'
    }, {
      key: 1,
      cardNumber: '8621 4855 3751 6405',
      expireDate: '11/16',
      importedDate: '2019-03-21 09:14:19 +07:00',
      status: true,
      note: 'Active'
    }, {
      key: 2,
      cardNumber: '8621 4855 3751 6405',
      expireDate: '11/16',
      importedDate: '2019-03-21 09:14:19 +07:00',
      status: false,
      note: 'Active'
    }]

    return (
      <Page className="card-warehouse-management">
        <Container>
          <div className="tool-box">
            <div className="left-box">
              <Select
                options={[{
                  value: 'all',
                  name: 'All'
                }]}
                value="all"
                modern
              />
            </div>
            <div className="right-box">
              <Input
                modern
                className="search-input"
                placeholder="Card Number"
              />
              <Button>Search</Button>
            </div>
          </div>
          <div className="top-action-box">
            <PaginationBar defaultCurrent={1} total={20} />
            <div className="stats-box">
              <p>Remaining card in Stock: <b>1103</b></p>
              <p>Current waiting card quantity in checked list: <b>0</b></p>
            </div>
          </div>
          <Table
            rowKey={(row, index) => index}
            columns={this._columns}
            dataSource={data}
            scroll={{ x: 1520 }}
          />
          <div className="bottom-action-box">
            <PaginationBar defaultCurrent={1} total={20} />
            <div className="button-group">
              <Button
                size="small"
                onClick={() => this._importCardModal.open()}
              >
                Import Card
              </Button>
              <Button
                size="small"
              >
                Export Card
              </Button>
              <Button
                size="small"
                onClick={() => this._changeCardModal.open()}
              >
                Change Card
              </Button>
            </div>
          </div>
          <ImportCardModal
            ref={(ref) => { this._importCardModal = ref }}
          />
          <ChangeCardModal
            ref={(ref) => { this._changeCardModal = ref }}
          />
        </Container>
      </Page>
    )
  }
}

export default CardWarehouseManagement
