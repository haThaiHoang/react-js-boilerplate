import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { object, string } from 'yup'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Request from '@/utils/request'
import Storage from '@/utils/storage'
import { Images } from '@/theme'
import Container from '@/components/container'
import Input from '@/components/input'
import Button from '@/components/button'
import Page from '@/components/page'
import Field from '@/components/field'

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .form {
    padding: 40px;
    box-shadow: 0 12px 201px 0 rgba(0, 0, 0, 0.06);
    width: 440px;
    border-radius: 4px;
    background-color: white;

    .logo {
      max-width: 300px;
      transform: translateX(-50%);
      margin: 0 auto 30px 50%;
    }

    .title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
      text-align: center;
    }

    .field-group {
      > * {
        margin-bottom: 9px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .action-box {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }
`

const validationSchema = object().shape({
  username: string().required(),
  password: string().required()
})

@inject((stores) => ({
  authStore: stores.auth
}))
@observer
class Login extends Component {
  static propTypes = {
    authStore: PropTypes.object
  }

  state = {
    loading: false
  }

  _onSubmit = async (values) => {
    const { authStore, history } = this.props

    this.setState({ loading: true })

    const { success, data } = await authStore.login(values)

    if (success) {
      Storage.set('ACCESS_TOKEN', data.token)
      Request.setAccessToken(data.token)

      this.setState({ loading: false })
      history.push('/')
    } else {
      this.setState({ loading: false })
    }
  }

  _renderForm = ({ handleSubmit }) => {
    const { loading } = this.state

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
            name="username"
            label="User name"
            component={Input}
          />
          <Field
            name="password"
            label="Password"
            type="password"
            component={Input}
          />
        </div>
        <div className="action-box">
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            loading={loading}
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
      username: '',
      password: ''
    }

    return (
      <Page>
        <StyledContainer>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this._onSubmit}
            component={this._renderForm}
          />
        </StyledContainer>
      </Page>
    )
  }
}

export default Login
