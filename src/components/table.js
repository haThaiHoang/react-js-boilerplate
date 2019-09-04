import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import 'antd/es/table/style/css'

const StyledTable = styled(Table)`

`

export default (props) => (
  <StyledTable {...props} pagination={false} />
)
