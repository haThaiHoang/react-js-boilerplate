import React, { Component } from 'react'
import { Typography } from 'antd'
import styled from 'styled-components'

const StyledTitle = styled(Typography.Title)`
  /* stylelint-disable */
`
const StyledText = styled(Typography.Text)`
`
const StyledParagraph = styled(Typography.Paragraph)`
`


export default class extends Component {
  static Title = ({ children, ...props }) => (
    <StyledTitle {...props}>{children}</StyledTitle>
  )

  static Text = ({ children, ...props }) => (
    <StyledText {...props}>{children}</StyledText>
  )

  static Paragraph = ({ children, ...props }) => (
    <StyledParagraph {...props}>{children}</StyledParagraph>
  )

  render() {
    const { children, ...props } = this.props

    return <Typography {...props}>{children}</Typography>
  }
}
