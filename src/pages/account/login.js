import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { connect } from 'react-redux'
import { object, string } from 'yup'
import './style.scss'

import Storage from '@/utils/storage'
import { Images } from '@/theme'
import { TYPES, actions } from '@/store/actions'
import Container from '@/components/container'
import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Field from '@/components/field'

const validationSchema = object().shape({
  userCode: string().required(),
  password: string().required()
})

@connect(state => ({
  accountStore: state.account
}), {
  login: actions.login,
  getAccountInfo: actions.getAccountInfo
})

class Login extends Component {
  _onSubmit = (values) => {
    const { login, getAccountInfo, history } = this.props

    login(values, (action, data) => {
      if (action === TYPES.LOGIN_SUCCESS) {
        Storage.set('ACCESS_TOKEN', `${data.token}`)

        getAccountInfo(null, (secondAction) => {
          if (secondAction === TYPES.GET_ACCOUNT_INFO_SUCCESS) {
            history.push('/')
          }
        })
      }
    })
  }

  _renderForm = ({ handleSubmit, ...form }) => {
    const { accountStore } = this.props

    return (
      <Form className="form">
        <img
          src={Images.LOGO}
          alt=""
          className="logo"
        />
        <p className="title">LOGIN</p>
        <div className="field-group">
          <Field
            form={form}
            name="userCode"
            label="User name"
            icon="user"
            component={Input}
          />
          <Field
            form={form}
            name="password"
            label="Password"
            type="password"
            icon="lock"
            component={Input}
          />
        </div>
        <div className="action-box">
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            loading={!!accountStore.submitting}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </Form>
    )
  }

  render() {
    const initialValues = {
      userCode: '',
      password: ''
    }

    return (
      <Page className="login">
        <Container className="content">
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this._onSubmit}
            component={this._renderForm}
          />
        </Container>
      </Page>
    )
  }
}

export default Login
