import React from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
`

export default ({ children, ...props }) => (
  <StyledModal
    centered
    // width={600}
    footer={null}
    {...props}
  >
    {children}
  </StyledModal>
)
