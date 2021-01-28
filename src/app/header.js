import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import styled from 'styled-components'
import { inject } from 'mobx-react'

import Storage from '@/utils/storage'

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  background-color: ${({ theme }) => theme.primary};
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
  z-index: 0;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-box {
      display: flex;
      align-items: center;

      .menu-button {
        margin-right: 20px;
        font-size: 22px;
        cursor: pointer;
        transition: opacity 0.2s;
        user-select: none;

        &:hover {
          opacity: 0.8;
        }

        &:active {
          opacity: 0.6;
        }
      }

      .title {
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 1px;
      }
    }

    .right-box {
      display: flex;
      align-items: center;

      .user-box {
        display: flex;
        align-items: center;
        margin-right: 37px;
        cursor: pointer;
        user-select: none;

        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          margin-right: 20px;
        }

        .name {
          font-size: 16px;
          letter-spacing: 0.21px;
          margin-bottom: 0;
          margin-right: 10px;
        }

        .anticon {
          font-size: 12px;
        }
      }
    }
  }
`

@inject((stores) => ({
  routingStore: stores.routing
}))
class Header extends Component {
  static propTypes = {
    routingStore: PropTypes.object
  }

  _onLogout = (e) => {
    e.preventDefault()
    const { routingStore } = this.props

    Storage.clear()
    routingStore.replace('/login')
  }

  render() {
    return (
      <HeaderContainer>
        <div className="content">
          <div className="left-box">
            <p className="title">React JS Boilerplate</p>
          </div>
          <div className="right-box">
            <Popover
              content={(
                <a href="/" onClick={this._onLogout}>Logout</a>
              )}
              trigger="click"
            >
              <div className="user-box">
                <img
                  className="avatar"
                  src="https://picsum.photos/300"
                  alt=""
                />
                <p className="name">Hoanght</p>
              </div>
            </Popover>
          </div>
        </div>
      </HeaderContainer>
    )
  }
}

export default Header
