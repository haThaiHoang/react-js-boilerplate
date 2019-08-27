import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Popover } from 'antd'
import { push } from 'connected-react-router'
import { withLocalize } from 'react-localize-redux'
import styled from 'styled-components'

import Storage from 'app/utils/storage'
import { actions } from 'app/store/actions'
import { Images, Media } from 'app/theme'

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  background-color: #005398;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0px 0 8px 2px rgba(0, 0, 0, 0.2);
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

      .flags {
        .flag {
          width: 35px;
          cursor: pointer;
          transition: opacity 0.2s;
          margin-right: 16px;
          opacity: 0.5;

          &:last-child {
            margin-right: 0;
          }

          &:hover {
            opacity: 0.7;
          }

          &.active {
            opacity: 1;
            cursor: auto;
          }
        }
      }

    }
  }

  ${Media.lessThan('md')`
    padding: 0;
  `}
`

@withLocalize
@connect(state => ({
  accountStore: state.account
}), {
  historyPush: push,
  toggleSideBar: actions.toggleSideBar
})

class Header extends Component {
  _onLogout = (e) => {
    e.preventDefault()

    const { historyPush } = this.props

    Storage.remove('ACCESS_TOKEN')
    historyPush('/login')
  }

  render() {
    const { languages, setActiveLanguage, accountStore, toggleSideBar } = this.props

    return (
      <HeaderContainer>
        <div className="content">
          <div className="left-box">
            <Icon
              onClick={toggleSideBar}
              className="menu-button"
              type="menu"
            />
            <p className="title">Card System Management</p>
          </div>
          <div className="right-box">
            {accountStore.userCode && (
              <Popover
                content={(
                  <a href="/" onClick={this._onLogout}>Logout</a>
                )}
                trigger="click"
              >
                <div className="user-box">
                  {/* <img
                    className="avatar"
                    src="https://image-us.eva.vn/upload/2-2019/images/2019-04-24/ra-mv-moi-chipu-thi-dep-that-nhung-fan-chi-chu-y-den-chiec-luoc-chai-chay-f1e397547b12924ccb03-1556124078-242-width1000height1000.jpg"
                    alt=""
                  /> */}
                  <p className="name">{accountStore.userCode}</p>
                  <Icon type="down" />
                </div>
              </Popover>
            )}
            <div className="flags">
              {languages.map(language => (
                <img
                  onClick={() => setActiveLanguage(language.code)}
                  key={language.code}
                  src={Images[`${language.code.toUpperCase()}_FLAG`]}
                  className={language.active ? 'flag active' : 'flag'}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
      </HeaderContainer>
    )
  }
}

export default Header
