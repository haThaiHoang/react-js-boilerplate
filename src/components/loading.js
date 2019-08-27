import styled from 'styled-components'

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
    border: 6px solid rgba(0, 83, 152, 1);
    border-left-color: rgba(0, 83, 152, 0.5);
    border-right-color: rgba(0, 83, 152, 0.5);
    animation: rotation 1s infinite linear;
  }
`
