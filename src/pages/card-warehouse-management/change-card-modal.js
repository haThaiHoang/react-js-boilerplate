import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { Modal, Field, Button, Input } from '@/components'

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
})

class ChangeCardModal extends Component {
  state = {
    isOpen: false,
    member: null
  }

  open = (member) => {
    this.setState({
      isOpen: true,
      member
    })
  }

  close = () => {
    this.setState({
      isOpen: false
    })
  }

  _renderForm = ({ handleSubmit, ...form }) => (
    <Form className="form">
      <Field
        form={form}
        name="id"
        placeholder="Enter Card Number"
        component={Input}
      />
      <div className="action-box">
        <Button
          type="basic"
          onClick={this.close}
        >
          Close
        </Button>
        <Button
          htmlType="submit"
          onClick={handleSubmit}
        >
          Change
        </Button>
        <Button>
          Find Card
        </Button>
      </div>
    </Form>
  )

  render() {
    const { isOpen, member } = this.state

    return (
      <Modal
        className="change-card-modal"
        title="Change Card"
        visible={isOpen}
        onCancel={this.close}
      >
        <Formik
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={member}
          validationSchema={validationSchema}
          onSubmit={this._onSubmit}
          component={this._renderForm}
        />
      </Modal>
    )
  }
}

export default ChangeCardModal
