import React from 'react'
import styled from 'styled-components'
import lodash from 'lodash'

const Container = styled.ul`
  margin: 0;
  padding: 0;
  margin-bottom: 25px;
`
const Title = styled.p`
  color: #f13aa8;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`
const Item = styled.p`

  &:last-child {
    margin-bottom: 0;
  }
`

export default ({ errors }) => !lodash.isEmpty(errors) && (
  <Container>
    <Title>ERROR</Title>
    {lodash.values(errors).map((item, index) => (
      <Item key={index}>{item}</Item>
    ))}
  </Container>
)
