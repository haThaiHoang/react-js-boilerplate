import React from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  .ant-modal-content {
    .ant-modal-header {
      padding: 40px;
      padding-bottom: 0;
      border-bottom: none;

      .ant-modal-title {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0.43px;
        color: #121212;
      }
    }

    .ant-modal-body {
      padding: 40px;

      .action-box {
        margin-top: 46px;
        display: flex;
        justify-content: center;

        > * {
          margin-right: 20px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
`

export default ({ children, ...props }) => {
  return (
    <StyledModal
      centered
      width={600}
      footer={null}
      {...props}
    >
      {children}
    </StyledModal>
  )
}
