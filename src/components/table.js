import { Table } from 'antd'
import styled from 'styled-components'

const StyledTable = styled(Table)`
  /* stylelint-disable */
`

export default (props) => (
  <StyledTable {...props} pagination={false} />
)
