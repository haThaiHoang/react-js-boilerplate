import React, { Component } from 'react'
import { Icon } from 'antd'

import { Modal, Button } from 'app/components'

class ImportCardModal extends Component {
  state = {
    isOpen: false
  }

  open = () => {
    this.setState({
      isOpen: true
    })
  }

  close = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    const { isOpen } = this.state

    return (
      <Modal
        className="import-card-modal"
        title="Import Card from Excel"
        visible={isOpen}
        onCancel={this.close}
      >
        <div className="file-picker-box">
          <div>
            <Icon type="cloud-upload" />
            <p>Choose file <span>(excel)</span></p>
          </div>
        </div>
        <div className="action-box">
          <Button
            type="basic"
            onClick={this.close}
          >
            Close
          </Button>
          <Button
            htmlType="submit"
          >
            Import
          </Button>
        </div>
      </Modal>
    )
  }
}

export default ImportCardModal
