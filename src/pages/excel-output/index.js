import React, { Component } from 'react'
import { DatePicker, Card, Row, Col } from 'antd'
import './style.scss'

import { Page, Container, Button, Checkbox } from 'app/components'

class ExcelOutput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedPaymentStatus: [],
      selectedFileField: [],
      fromDate: null,
      toDate: null
    }
  }

  _onChangeFromDate = (fromDate) => {
    this.setState({ fromDate })
  }

  _onChangeToDate = (toDate) => {
    this.setState({ toDate })
  }

  _onChangePaymentStatus = (e, paymentStatus) => {
    const { selectedPaymentStatus } = this.state
    const selectedItems = [...selectedPaymentStatus]
    const indexItem = selectedItems.findIndex(item => item === paymentStatus.id)

    if (e.target.checked && indexItem === -1) {
      selectedItems.push(paymentStatus.id)
    } else if (!e.target.checked && indexItem !== -1) {
      selectedItems.splice(indexItem, 1)
    }
    this.setState({
      selectedPaymentStatus: selectedItems
    })
  }

  _onChangeFileField = (e, fileField) => {
    const { selectedFileField } = this.state
    const selectedItems = [...selectedFileField]
    const indexItem = selectedItems.findIndex(item => item === fileField.id)

    if (e.target.checked && indexItem === -1) {
      selectedItems.push(fileField.id)
    } else if (!e.target.checked && indexItem !== -1) {
      selectedItems.splice(indexItem, 1)
    }
    this.setState({
      selectedFileField: selectedItems
    })
  }

  render() {
    const paymentStatus = [{
      id: 1,
      name: 'initial'
    }, {
      id: 2,
      name: '1 Card applicant (not yet settled)'
    }, {
      id: 3,
      name: '2 Card applicant (Settled) (Unchecked)'
    }, {
      id: 4,
      name: '3-0 Reapplication (for unchecked)'
    }, {
      id: 5,
      name: '3-1 Reapplication (for checked)'
    }, {
      id: 6,
      name: '4 Card applicant (Settled) (Checked)'
    }, {
      id: 7,
      name: '5-0 card printing'
    }, {
      id: 8,
      name: '5-1 Card sending hold'
    }, {
      id: 9,
      name: '6 Card final check'
    }, {
      id: 10,
      name: '7-0 Before address confirmation '
    }, {
      id: 11,
      name: '7-1 Before Address Confirmation (Sent)'
    }, {
      id: 12,
      name: '8 Address confirmed (card not sent)'
    }, {
      id: 13,
      name: '9 Card sending complete (sending)'
    }, {
      id: 14,
      name: '10-0 Not refunded'
    }]

    const fields = [{
      id: 1,
      name: 'Name'
    }, {
      id: 2,
      name: 'Surname'
    }, {
      id: 3,
      name: 'Maill address'
    }, {
      id: 4,
      name: 'The battery'
    }, {
      id: 5,
      name: 'Greenbox ID'
    }, {
      id: 6,
      name: 'Gender'
    }, {
      id: 7,
      name: 'Birthday'
    }, {
      id: 8,
      name: 'Career'
    }, {
      id: 9,
      name: 'Telephone country code'
    }, {
      id: 10,
      name: 'Phone number'
    }, {
      id: 11,
      name: 'Country of citizenship'
    }, {
      id: 12,
      name: 'Street address'
    }, {
      id: 13,
      name: 'Postal code'
    }, {
      id: 14,
      name: 'Passport expiration'
    }, {
      id: 15,
      name: 'Place of issue'
    }, {
      id: 16,
      name: 'Passport number'
    }, {
      id: 17,
      name: 'Place of issue'
    }, {
      id: 18,
      name: 'Payment status'
    }, {
      id: 19,
      name: 'Card number'
    }, {
      id: 20,
      name: 'Box name'
    }, {
      id: 21,
      name: 'Box order'
    }, {
      id: 22,
      name: 'Card deadline'
    }, {
      id: 23,
      name: 'payment transaction ID'
    }, {
      id: 24,
      name: 'Payment fee'
    }, {
      id: 25,
      name: 'Robin account created date'
    }, {
      id: 26,
      name: 'Application password'
    }, {
      id: 27,
      name: 'Inquiry number'
    }, {
      id: 28,
      name: 'Shipping number'
    }, {
      id: 29,
      name: 'Password URL'
    }]

    const { fromDate, toDate } = this.state

    return (
      <Page className="excel-output">
        <Container>
          <div className="tool-box">
            <p className="title">Excel output of application</p>
            <div className="right-box">
              <p>Application date</p>
              <DatePicker
                className="date-input"
                placeholder="From"
                value={fromDate}
                onChange={this._onChangeFromDate}
                format="DD/MM/YYYY"
              />
              <DatePicker
                className="date-input"
                placeholder="To"
                value={toDate}
                onChange={this._onChangeToDate}
                format="DD/MM/YYYY"
              />
            </div>
          </div>
          <Card
            title={(
              <Row gutter={8}>
                <Col xs={6}>
                  <p>Search by payment status</p>
                </Col>
                <Col xs={18}>
                  <p>Select Excel File Field</p>
                </Col>
              </Row>
            )}
            bordered={false}
          >
            <Row gutter={8} className="field-container">
              <Col xs={6}>
                {paymentStatus.map(item => (
                  <Checkbox
                    key={item.id}
                    onChange={e => this._onChangePaymentStatus(e, item)}
                  >
                    {item.name}
                  </Checkbox>
                ))}
              </Col>
              <Col xs={18}>
                <Row gutter={8}>
                  {fields.map(item => (
                    <Col xs={8} key={item.id}>
                      <Checkbox onChange={e => this._onChangeFileField(e, item)}>
                        {item.name}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <div className="bottom-action-box">
              <Button size="small">
                Download
              </Button>
              <Button size="small">
                Export Excel for EZP
              </Button>
            </div>
          </Card>
        </Container>
      </Page>
    )
  }
}

export default ExcelOutput
