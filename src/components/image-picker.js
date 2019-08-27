import React, { Component } from 'react'
import styled from 'styled-components'

import { readAsDataURL } from '@/utils/file-reader'
import Button from './button'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  img {
    width: 100%;
  }

  .passport-input {
    display: none;
  }

  .change-image-button {
    margin-top: 20px;
  }

  .caution {
    font-size: 13px;
    color: #d60101;
    margin-top: 8px;
  }
`

export default class extends Component {
  _onPassportInputChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      readAsDataURL(file, (result) => {
        this.props.field.onChange({
          target: {
            value: {
              file,
              showFile: result
            },
            name: this.props.field.name
          }
        })
      })
    }
  }

  render() {
    const { field, readOnly } = this.props

    return (
      <Box>
        <img src={field.value.showFile} alt="" />
        <input
          type="file"
          accept=".jpg"
          onChange={this._onPassportInputChange}
          ref={(ref) => { this._passportInput = ref }}
          className="passport-input"
        />
        {!readOnly && (
          <>
            <Button
              className="change-image-button"
              size="small"
              type="basic"
              icon="cloud-upload"
              onClick={() => this._passportInput.click()}
            >
              Change picture
            </Button>
            <p className="caution">Only accept files of JPG format. FileSize:500KB~4MB</p>
          </>
        )}
      </Box>
    )
  }
}
