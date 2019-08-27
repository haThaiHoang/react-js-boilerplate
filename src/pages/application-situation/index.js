import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import './style.scss'

import Misc from 'app/utils/misc'
import { CHECK_STATUS } from 'app/constants'
import { actions } from 'app/store/actions'
import { Page, Container, Button, Select, Input } from 'app/components'
import languageEN from 'app/languages/application-situation/en.json'
import languageJP from 'app/languages/application-situation/jp.json'
import Unpaid from './unpaid'
import PaidChecked from './paid-checked'
import PaidUnchecked from './paid-unchecked'
import ReconfirmFromUnchecked from './reconfirm-from-unchecked'
import ReconfirmFromChecked from './reconfirm-from-checked'
import ReconfirmFromInputCard from './reconfirm-from-input-card'

const REGISTER_SITE_NAMES = [
  {
    name: 'SGP_EXCHANGE',
    value: 'SGP_EXCHANGE'
  },
  {
    name: 'DC_MASTER',
    value: 'DC_MASTER'
  }
]

@withLocalize
@connect(state => ({
  accountStore: state.account,
  businessSystemStore: state.businessSystem,
  applicationStore: state.application
}), {
  getBusinessSystem: actions.getBusinessSystem,
  getApplications: actions.getApplications,
  setApplicationStoreParams: actions.setApplicationStoreParams,
  resetApplicationStore: actions.resetApplicationStore
})

class ApplicationSituation extends Component {
  constructor(props) {
    super(props)
    const { addTranslationForLanguage } = props

    addTranslationForLanguage(languageEN, 'en')
    addTranslationForLanguage(languageJP, 'jp')

    this.state = {
      isSearching: false
    }
  }

  componentDidMount() {
    const { getBusinessSystem } = this.props
    getBusinessSystem()
  }

  componentWillUnmount() {
    const { resetApplicationStore } = this.props
    resetApplicationStore()
  }

  _onSearchFieldChange = (e) => {
    const { setApplicationStoreParams } = this.props

    setApplicationStoreParams({ [e.target.name]: e.target.value, type: 'params' })
  }

  _onSearch = () => {
    this.setState({
      isSearching: true
    })
    const { getApplications, applicationStore } = this.props

    let data = {
      ...applicationStore.params
    }
    delete data.totalDoc

    data = Misc.objectRemoveBlank(data)
    switch (data.isChecked) {
      case CHECK_STATUS.CHECKED.value:
        data.isChecked = true
        break
      case CHECK_STATUS.NOT_CHECK.value:
        data.isChecked = false
        break
      default:
        delete data.isChecked
    }
    getApplications(data, () => {
      this.setState({
        isSearching: false
      })
    })
  }

  render() {
    let {
      match,
      accountStore: { roleName },
      businessSystemStore,
      applicationStore: { params: { businessId, registerSiteName } }
    } = this.props
    const { isSearching } = this.state

    const page = match.params.name
    return (
      <Page className="application-situation">
        <Container>
          <div className="tool-box">
            <p className="title">
              {page === '1' && 'Un-paid'}
              {page === '2' && 'Paid un-check list'}
              {page === '3-1' && 'Re-confirm from un-check'}
              {page === '3-2' && 'Re-confirm from checked'}
              {page === '3-3' && 'Re-confirm from input card'}
              {page === '4' && 'Paid checked list'}
            </p>
            <div className="right-box">
              {roleName === 'SUPER-ADMIN' && (
                <>
                  <Select
                    className="search-type"
                    options={REGISTER_SITE_NAMES}
                    placeholder="Register site"
                    modern
                    onChange={this._onSearchFieldChange}
                    name="registerSiteName"
                    value={registerSiteName}
                    allowClear
                  />
                  <Select
                    className="search-type"
                    options={businessSystemStore.businessSystems}
                    placeholder="Business name"
                    modern
                    onChange={this._onSearchFieldChange}
                    name="businessId"
                    optionBinding={{
                      value: 'id',
                      name: 'businessName'
                    }}
                    value={businessId}
                    allowClear
                  />
                </>
              )}
              <Input
                modern
                className="search-input"
                placeholder="SYSTEM ID, BUSSINESS ID, EMAIL, NAME, PASSPORT NUMBER"
                name="paramSearch"
                onChange={this._onSearchFieldChange}
              />
              <Button loading={isSearching} onClick={this._onSearch}>Search</Button>
            </div>
          </div>
          {match.params.name === '1' && <Unpaid />}
          {match.params.name === '2' && <PaidUnchecked />}
          {match.params.name === '3-1' && <ReconfirmFromUnchecked />}
          {match.params.name === '3-2' && <ReconfirmFromChecked />}
          {match.params.name === '3-3' && <ReconfirmFromInputCard />}
          {match.params.name === '4' && <PaidChecked />}
        </Container>
      </Page>
    )
  }
}

export default ApplicationSituation
