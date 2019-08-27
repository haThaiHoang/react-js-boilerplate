import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { Icon } from 'antd'
import './style.scss'

import { Page, Container, Input, Button, Field } from '@/components'

class PassportImageOutput extends Component {
  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <div className="file-picker-box">
        <div>
          <Icon type="cloud-upload" />
          <p>Choose file <span>(excel)</span></p>
        </div>
      </div>
      <Field
        inline
        form={form}
        placeholder="Enter the email address"
        name="email"
        label="Email to be notified:"
        icon="user"
        component={Input}
      />
      <div className="action-box">
        <Button
          htmlType="submit"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
    </Form>
  )

  render() {
    return (
      <Page className="passport-image-output">
        <Container>
          <p className="title">PASSPORT IMAGE OUTPUT</p>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{ email: '' }}
            // validationSchema={validationSchema}
            onSubmit={this._onSubmit}
            component={this._renderForm}
          />
        </Container>
      </Page>
    )
  }
}

export default PassportImageOutput
