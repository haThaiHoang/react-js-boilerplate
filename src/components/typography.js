import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import { Colors } from '@/theme'

const StyledP = styled.p`
  text-align: ${(props) => props.align || 'left'};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  font-size: 14px;
  
  &.tiny {
    font-size: 10px;
  }
  
  &.small {
    font-size: 12px;
  }
  
  &.large {
    font-size: 16px;
  }
  
  &.big {
    font-size: 18px;
  }
  
  &.huge {
    font-size: 20px;
  }
  
  &.giant {
    font-size: 30px;
  }
  
  &.enormous {
    font-size: 40px;
  }
  
  &.link {
    cursor: pointer;
    user-select: none;
  }
  
  &.underline {
    text-decoration: underline;
  }
  
  &.primary {
    color: ${Colors.PRIMARY};
  }
  
  &.center {
    text-align: center;
  }
`

const Typography = ({
  className,
  children,
  link,
  underline,
  primary,
  center,
  size,
  ...props
}) => (
  <StyledP
    className={classnames(size || '', {
      link,
      underline,
      primary,
      center
    }, 'typography', className)}
    {...props}
  >
    {children}
  </StyledP>
)
Typography.propTypes = {
  size: PropTypes.string,
  link: PropTypes.bool,
  primary: PropTypes.bool,
  underline: PropTypes.bool,
  center: PropTypes.bool
}

export default Typography
