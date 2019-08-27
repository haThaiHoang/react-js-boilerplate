import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import { Skeleton } from 'antd'
import './style.scss'

import languageEN from 'app/languages/authority-setting/en.json'
import languageJP from 'app/languages/authority-setting/jp.json'
import { Page, Container, Button, Input } from 'app/components'
import { actions, TYPES } from 'app/store/actions'
import DeleteAuthorityModal from './delete-authority-modal'
import EditAuthorityModal from './edit-authority-modal'

@withLocalize
@connect(state => ({
  accountStore: state.account,
  rolesStore: state.roles
}), {
  getRoles: actions.getRoles,
  getPermissions: actions.getPermissions
})

class AuthoritySetting extends Component {
  constructor(props) {
    super(props)
    const { addTranslationForLanguage } = props

    addTranslationForLanguage(languageEN, 'en')
    addTranslationForLanguage(languageJP, 'jp')
  }

  componentDidMount() {
    this.props.getRoles()
    this.props.getPermissions()
  }

  render() {
    const { accountStore, rolesStore } = this.props
    const { permissions } = accountStore

    return (
      <Page className="authority-setting">
        <Container>
          <p className="title">AUTHORITY SETTING</p>
          <div className="action-box">
            {permissions.includes('CREATE_ROLE') && (
              <Button
                icon="plus-circle"
                size="small"
                onClick={() => { this._editAuthorityModal.open() }}
              >
                Add new authority
              </Button>
            )}
          </div>
          <div className="form-box">
            <Skeleton
              loading={
                rolesStore.submitting === TYPES.GET_ROLES_REQUEST
                || rolesStore.submitting === TYPES.GET_PERMISSIONS_REQUEST
              }
              active
              title={false}
              paragraph={{
                rows: 4,
                width: ['65%', '100%', '100%', '100%']
              }}
            />
            {rolesStore.roles.map(record => (
              <div key={record.id} className="field">
                <Input
                  value={record.roleName}
                  readOnly
                />
                <div>
                  {record.roleName !== 'SUPER-ADMIN' && (
                    <>
                      {permissions.includes('UPDATE_ROLE') && (
                        <Button
                          type="edit"
                          icon="edit"
                          onClick={() => { this._editAuthorityModal.open(record) }}
                        >
                          Edit
                        </Button>
                      )}
                      {permissions.includes('DELETE_ROLE') && (
                        <Button
                          type="delete"
                          icon="delete"
                          onClick={() => { this._deleteAuthorityModal.open(record) }}
                        >
                          Delete
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
        <DeleteAuthorityModal
          innerRef={(ref) => { this._deleteAuthorityModal = ref }}
        />
        <EditAuthorityModal
          innerRef={(ref) => { this._editAuthorityModal = ref }}
        />
      </Page>
    )
  }
}

export default AuthoritySetting
