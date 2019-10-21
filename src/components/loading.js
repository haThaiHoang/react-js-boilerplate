import styled from 'styled-components'

import { Colors } from '@/theme'

export default styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    display: block;
    content: "";
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid ${({ theme }) => theme.primary};
    border-left-color: ${({ theme }) => Colors.alpha(theme.primary, 0.5)};
    border-right-color: ${({ theme }) => Colors.alpha(theme.primary, 0.5)};
    animation: rotation 1s infinite linear;
  }
`
