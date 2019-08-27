import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Storage from 'app/utils/storage'
import { Loading, Page } from 'app/components'
import Header from './header'
import SideBar from './side-bar'
import Init from './init'

const Login = lazy(() => import('app/pages/account/login'))
const Home = lazy(() => import('app/pages/home'))
const AuthoritySetting = lazy(() => import('app/pages/authority-setting'))
const ManagerSetting = lazy(() => import('app/pages/manager-setting'))
const ApplicationSituation = lazy(() => import('app/pages/application-situation'))
const CardWarehouseManagement = lazy(() => import('app/pages/card-warehouse-management'))
const RegisterTheApplication = lazy(() => import('app/pages/register-the-application'))
const PassportImageOutput = lazy(() => import('app/pages/passport-image-output'))
const ExcelOutput = lazy(() => import('app/pages/excel-output'))
const NotFound = lazy(() => import('app/pages/not-found'))

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const HorizontalBox = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`

const PrivateRoute = ({ condition, redirect, ...props }) => {
  condition = condition()

  if (condition) return <Route {...props} />
  return <Redirect to={redirect} />
}

class Routes extends Component {
  _renderLazyComponent = (LazyComponent, params) => props => <LazyComponent {...props} {...params} />

  _renderAuthRoutes = () => (
    <HorizontalBox>
      <SideBar />
      <Suspense fallback={<Page sidebar><Loading /></Page>}>
        <Switch>
          <Route exact path="/" component={this._renderLazyComponent(Home)} />
          <Route exact path="/authority-setting" component={this._renderLazyComponent(AuthoritySetting)} />
          <Route exact path="/manager-setting" component={this._renderLazyComponent(ManagerSetting)} />
          <Route exact path="/application-situation/:name" component={this._renderLazyComponent(ApplicationSituation)} />
          <Route exact path="/card-warehouse-management" component={this._renderLazyComponent(CardWarehouseManagement)} />
          <Route exact path="/register-the-application" component={this._renderLazyComponent(RegisterTheApplication)} />
          <Route exact path="/passport-image-output" component={this._renderLazyComponent(PassportImageOutput)} />
          <Route exact path="/excel-output" component={this._renderLazyComponent(ExcelOutput)} />
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </HorizontalBox>
  )

  render() {
    return (
      <VerticalBox>
        <Init />
        <Header />
        <Suspense fallback={<Page><Loading /></Page>}>
          <Switch>
            <Route path="/login" component={this._renderLazyComponent(Login)} />
            <Route path="/not-found" component={this._renderLazyComponent(NotFound)} />
            <PrivateRoute
              condition={() => Storage.has('ACCESS_TOKEN')}
              redirect="/login"
              path="/"
              component={this._renderAuthRoutes}
            />
          </Switch>
        </Suspense>
      </VerticalBox>
    )
  }
}

export default Routes
