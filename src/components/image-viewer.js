import React, { Component } from 'react'
import styled from 'styled-components'

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  user-select: none;

  .transition-box {
    overflow: hidden;
    position: relative;
    transition: transform 0.4s;
    cursor: pointer;

    img {
      width: 100%;
    }

    .magnifier-glass {
      opacity: 0;
      position: absolute;
      background-position: center;
      background-size: 200%;
      background-repeat: no-repeat;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      transition: opacity 0.4s;
    }

    &:hover {
      .magnifier-glass {
        opacity: 1;
      }
    }
  }
`

export default class ImageViewer extends Component {
  state = {
    rotate: 0
  }

  componentDidMount() {
  }

  _onMouseMove = (e) => {
    const { rotate } = this.state

    const { x, y } = this._getCursorPosition(e)
    const { offsetWidth, offsetHeight } = e.target

    let rotateX = -x
    let rotateY = -y

    if (rotate === 90) {
      rotateX = -y
      rotateY = x - offsetHeight
    } else if (rotate === 180) {
      rotateX = x - offsetWidth
      rotateY = y - offsetHeight
    } else if (rotate === 270) {
      rotateX = y - offsetWidth
      rotateY = -x
    }

    this._magnifierGlass.style.backgroundPosition = `${rotateX}px ${rotateY}px`
  }

  _onRotate = () => {
    const { rotate } = this.state

    this.setState({
      rotate: rotate === 0 ? 90 : rotate === 90 ? 180 : rotate === 180 ? 270 : 0
    })
  }

  _getCursorPosition(e) {
    let a; let x = 0; let y = 0
    e = e || window.event
    /* Get the x and y positions of the image: */
    a = e.target.getBoundingClientRect()
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left
    y = e.pageY - a.top
    /* Consider any page scrolling: */
    x -= window.pageXOffset
    y -= window.pageYOffset
    return { x, y }
  }

  render() {
    const { src } = this.props
    const { rotate } = this.state

    return (
      <Box>
        <div
          className="transition-box"
          onMouseMove={this._onMouseMove}
          onClick={this._onRotate}
          style={{
            transform: `rotate(${rotate}deg)`
          }}
        >
          <img
            src={src}
            alt=""
          />
          <div
            ref={(ref) => { this._magnifierGlass = ref }}
            className="magnifier-glass"
            style={{
              backgroundImage: `url(${src})`
            }}
          />
        </div>
      </Box>
    )
  }
}
