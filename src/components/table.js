import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'

const StyledTable = styled(Table)`

`

export default props => (
  <StyledTable {...props} pagination={false} />
)
