import { Component } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import Button from '@/components/button'
import Field from '@/components/field'
import Input from '@/components/input'
import Radios from '@/components/radios'
import DatePicker from '@/components/date-picker'
import ErrorFocuser from '@/components/error-focuser'
import Format from '@/utils/format'

const StyledDiv = styled.div`
  .form {
    .field-groups {
      > * {
        margin-bottom: 20px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`

const validationSchema = yup.object().shape({
  firstname: yup.string().required(),
  lastName: yup.string().required()
})

class FormSection extends Component {
  _onSubmit = () => {

  }

  _renderForm = ({ handleSubmit }) => (
    <Form className="form">
      <ErrorFocuser />
      <div className="field-groups">
        <Field.Group>
          <Field.Wraper>
            <Field.Label required>Name</Field.Label>
            <Field.Inner>
              <Field
                placeholder="First name"
                name="firstname"
                component={Input}
              />
              <Field
                placeholder="Last name"
                name="lastName"
                component={Input}
              />
            </Field.Inner>
          </Field.Wraper>
          <Field.Wraper>
            <Field.Label required>Address</Field.Label>
            <Field.Inner>
              <Field
                placeholder="Address 1"
                name="address1"
                component={Input}
              />
              <Field
                placeholder="Address 2"
                name="address2"
                component={Input}
              />
            </Field.Inner>
          </Field.Wraper>
        </Field.Group>
        <Field.Group>
          <Field.Wraper>
            <Field.Label required>Gender</Field.Label>
            <Field.Inner>
              <Field
                name="gender"
                showLine
                options={[{
                  name: 'Male',
                  value: 1
                }, {
                  name: 'Female',
                  value: 2
                }]}
                component={Radios}
              />
            </Field.Inner>
          </Field.Wraper>
          <Field.Wraper>
            <Field.Label required>Date of birth</Field.Label>
            <Field.Inner>
              <Field
                placeholder="DD/MM/YYYY"
                name="dateOfBirth"
                format="DD/MM/YYYY"
                inputOutputFormat={Format.FORMATS.DATE}
                component={DatePicker}
              />
            </Field.Inner>
          </Field.Wraper>
        </Field.Group>
      </div>
      <div className="action-box">
        <Button
          // loading={studentsStore.type === TYPES.CREATE_STUDENT}
          className="submit-button"
          onClick={handleSubmit}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  )

  render() {
    const initialValues = {
      gender: 1,
      firstname: '',
      lastName: ''
    }

    return (
      <section>
        <p className="section-title">
          Form
        </p>
        <div className="section-body">
          <StyledDiv>
            <Formik
              enableReinitialize
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={this._onSubmit}
              component={this._renderForm}
            />
          </StyledDiv>
        </div>
      </section>
    )
  }
}

export default FormSection
