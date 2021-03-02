import { Component } from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'

import { Images } from '@/theme'
import Clickable from '@/components/clickable'
import Typography from '@/components/typography'
import Button from '@/components/button'

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 6px;
  
    .ant-modal-close {
      display: none;
    }
  
    .ant-modal-body {
      padding: 0;
    
      .modal-content {
        .header {
          display: flex;
          justify-content: flex-end;
          padding: 8px;
          
          .close-button {
            img {
              width: 30px;
            }
          }
        }
        
        .body {
          padding: 0 35px 40px;
          
          .action-box {
            padding-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            
            .action-button {
              margin-right: 15px;
              
              &:last-child {
                margin-right: 0;
              }
            }
          }
          p {
            text-align: center;
          }
          button {
            width: 120px;
            background: #fff;
            &:first-child {
              color: #707070 !important;
            }
            &:last-child {
              background: red;
            }
          }
        }
      }
    }
  }
`

let instance

class Confirmable extends Component {
  static propTypes = {}

  state = {
    visible: false,
    content: null,
    acceptButtonText: null,
    hideCancelButton: false
  }

  static setInstance = (ref) => {
    instance = ref
  }

  static open = (...params) => {
    if (instance) {
      return instance.open(...params)
    }

    return null
  }

  open = ({ content, acceptButtonText, hideCancelButton }) => new Promise((resolve) => {
    this._resolve = resolve
    this.setState({
      visible: true,
      content,
      acceptButtonText,
      hideCancelButton
    })
  })

  _onClose = () => {
    this.setState({
      visible: false
    })
  }

  _onCancel = () => {
    this._resolve(false)

    this._onClose()
  }

  _onAccept = () => {
    this._onClose()

    setTimeout(() => {
      this._resolve(true)
    }, 300)
  }

  render() {
    const { visible, content, acceptButtonText, hideCancelButton } = this.state

    return (
      <StyledModal
        visible={visible}
        centered
        onCancel={this._onCancel}
        footer={null}
      >
        <div className="modal-content">
          <div className="header">
            <Clickable
              className="close-button"
              onClick={this._onCancel}
            >
              <img
                src={Images.GRAY_CLOSE_ICON}
                alt=""
              />
            </Clickable>
          </div>
          <div className="body">
            <Typography style={{ wordBreak: 'break-all' }}>
              {content}
            </Typography>
            <div className="action-box">
              {!hideCancelButton ? (
                <Button
                  color="#d0d0d0"
                  textColor="white"
                  onClick={this._onCancel}
                  className="action-button"
                >
                  キャンセル
                </Button>
              ) : (
                <Button
                  color="#d0d0d0"
                  textColor="white"
                  onClick={this._onCancel}
                  className="action-button"
                >
                  {hideCancelButton}
                </Button>
              )}
              <Button
                color="#b0b4b5"
                textColor="white"
                onClick={this._onAccept}
                className="action-button"
              >
                {acceptButtonText || 'OK'}
              </Button>
            </div>
          </div>
        </div>
      </StyledModal>
    )
  }
}

export default Confirmable
