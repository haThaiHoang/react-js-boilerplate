import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.scss'

import { Page, Container, Table, Button } from 'app/components'
import { actions, TYPES } from 'app/store/actions'
import EditMemberModal from './edit-member-modal'
import DeleteMemberModal from './delete-member-modal'

@connect(state => ({
  accountStore: state.account,
  adminStore: state.admin
}), {
  getAllAdmin: actions.getAllAdmin,
  resetAdmin: actions.resetAdmin
})

class ManagerSetting extends Component {
  componentDidMount() {
    const { getAllAdmin } = this.props
    getAllAdmin()
  }

  componentWillUnmount() {
    const { resetAdmin } = this.props
    resetAdmin()
  }

  _onClick = () => {
    const { history } = this.props

    history.push('/')
  }

  getNewCode = () => {
    const { adminStore: { admins } } = this.props
    if (Array.isArray(admins) && admins.length > 0) {
      const newestUserCode = admins[admins.length - 1]?.userCode

      const userCode = newestUserCode?.substr(3)
      const newUserCode = Number(userCode) + 1
      const prefix = newestUserCode.substr(0, newestUserCode.length - `${newUserCode}`.length)
      return prefix + newUserCode
    }
    return 'ALC00001'
  }

  render() {
    const { accountStore: { permissions }, adminStore } = this.props
    const { admins } = adminStore

    const columns = [{
      title: 'Code',
      width: 120,
      dataIndex: 'userCode',
      align: 'center',
      key: 'userCode'
    }, {
      title: 'Name',
      width: 300,
      align: 'center',
      dataIndex: 'adminName',
      key: 'adminName'
    }, {
      title: 'Mail address',
      width: 350,
      align: 'center',
      dataIndex: 'email',
      key: 'email'
    }, {
      title: 'Role',
      width: 350,
      align: 'center',
      dataIndex: 'role.name',
      key: 'role.name'
    }, {
      title: 'Status',
      width: 100,
      align: 'center',
      dataIndex: 'status',
      key: 'status'
    }, {
      title: 'Option',
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      render: (text, record) => record?.role?.name !== 'SUPER-ADMIN' && (
        <div className="action-cell">
          {permissions.includes('UPDATE_ADMIN') && (
            <Button
              type="edit"
              icon="edit"
              size="small"
              onClick={() => { this._editMemberModal.open(record) }}
            >
              Edit
            </Button>
          )}
          {permissions.includes('DELETE_ADMIN') && (
            <Button
              type="delete"
              icon="delete"
              size="small"
              onClick={() => { this._deleteMemberModal.open(record) }}
            >
              Delete
            </Button>
          )}
        </div>
      )
    }]

    return (
      <Page className="manager-setting">
        <Container>
          <p className="title">MEMBER SETTING</p>
          <div className="action-box">
            {permissions.includes('CREATE_ADMIN') && (
              <Button
                icon="plus-circle"
                size="small"
                onClick={() => { this._editMemberModal.open({ userCode: this.getNewCode() }) }}
              >
                Add new member
              </Button>
            )}
          </div>
          <Table
            loading={adminStore.submitting === TYPES.GET_ALL_ADMIN_REQUEST}
            rowKey={(row, index) => index}
            columns={columns}
            dataSource={admins}
            scroll={{ x: 1550, y: 'calc(100vh - 280px)' }}
          />
          <EditMemberModal
            innerRef={(ref) => { this._editMemberModal = ref }}
          />
          <DeleteMemberModal
            innerRef={(ref) => { this._deleteMemberModal = ref }}
          />
        </Container>
      </Page>
    )
  }
}

export default ManagerSetting
