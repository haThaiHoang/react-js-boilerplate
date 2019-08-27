import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import './style.scss'

import { Page, Container, Input, Button, Field } from 'app/components'

class RegisterTheApplication extends Component {
  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <Field
        inline
        form={form}
        placeholder="Type Robin ID"
        name="id"
        label="Robin ID:"
        icon="user"
        modern
        component={Input}
      />
      <div className="action-box">
        <Button
          htmlType="submit"
          onClick={handleSubmit}
        >
          Check
        </Button>
      </div>
    </Form>
  )

  render() {
    return (
      <Page className="register-the-application">
        <Container>
          <p className="title">Create application for admin</p>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{ id: '' }}
            // validationSchema={validationSchema}
            onSubmit={this._onSubmit}
            component={this._renderForm}
          />
        </Container>
      </Page>
    )
  }
}

export default RegisterTheApplication
