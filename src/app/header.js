import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Popover } from 'antd'
import { push } from 'connected-react-router'
import { withLocalize } from 'react-localize-redux'
import styled from 'styled-components'

import Storage from '@/utils/storage'
import { actions } from '@/store/actions'
import { Images } from '@/theme'

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
            <p className="title">React JS Boilerplate</p>
          </div>
          <div className="right-box">
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
