import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withLocalize } from 'react-localize-redux'
import { Menu } from 'antd'

import { Images } from '@/theme'

const Box = styled.div`
  width: 0;
  box-shadow: 4px 0 22px 0 rgba(0, 0, 0, 0.07);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  transition: width 0.5s;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &.open {
    width: 300px;
  }

  .surfing-box {
    width: 300px;

    .top {
      height: 100px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      display: flex;
      align-items: center;
      justify-content: center;

      .logo {
        max-width: 200px;
      }
    }

    .ant-menu {
      border-right: none;

      .ant-menu-item {
        font-size: 15px;
        color: #717171;
        height: 60px;
        padding-top: 11px;
        margin: 0;
        user-select: none;

        &::after {
          left: 0;
          right: auto;
          border-right: 5px solid #f47629;;
        }

        &:hover {
          color: #717171;
        }

        &.ant-menu-item-selected {
          background-color: #f7f7f7;
          font-weight: 600;
          color: #4b4b4b;
        }
      }

      .ant-menu-submenu {
        .ant-menu-submenu-title {
          margin: 0;
          font-size: 15px;
          color: #717171;
          height: 60px;
          padding-top: 11px;
          user-select: none;

          &:hover {
            color: #717171;
          }
        }

        .ant-menu {
          .ant-menu-item {
            border-bottom: 1px solid #e8e8e8;
            height: 84px;
            padding-top: 0;
            padding-left: 35px !important;
            display: flex;
            align-items: center;

            .custom {
              display: flex;
              align-items: center;

              span {
                width: 45px;
                font-size: 20px;
                font-weight: 600;
                letter-spacing: 0.31px;
                color: #4b4b4b;
                display: block;
              }

              p {
                flex: 1;
                word-wrap: break-word;
                white-space: pre-wrap;
                min-width: 0;
                font-size: 14px;
                line-height: 1.64;
                letter-spacing: 0.27px;
                color: #9d9d9d;
              }
            }
          }
        }

        &.ant-menu-submenu-selected {
          .ant-menu-submenu-title {
            background-color: #f7f7f7;
            font-weight: 600;
          }
        }
      }
    }
  }
`

const MENU_ITEMS = [{
  link: '/',
  name: 'Home'
}, {
  link: '/authority-setting',
  permission: 'GET_ROLE',
  name: 'Authority setting'
}, {
  link: '/manager-setting',
  permission: 'GET_ADMINS',
  name: 'Manager setting'
}, {
  link: '/application-situation',
  name: 'Application status',
  subItems: [{
    link: '/1',
    permission: 'GET_APPLICATION_BY_STATUS_UN_PAID_UNCHECKED',
    number: '1',
    name: 'Un-paid'
  }, {
    link: '/2',
    permission: 'GET_APPLICATION_BY_STATUS_PAID_UNCHECKED',
    number: '2',
    name: 'Paid un-check'
  }, {
    link: '/3-1',
    permission: 'GET_APPLICATION_BY_STATUS_RE_CONFIRM_PAID_UNCHECKED',
    number: '3-1',
    name: 'Re-confirm from un-checked'
  }, {
    link: '/3-2',
    permission: 'GET_APPLICATION_BY_STATUS_RE_CONFIRM_PAID_CHECKED',
    number: '3-2',
    name: 'Re-confirm from checked'
  }, {
    link: '/3-3',
    permission: 'GET_APPLICATION_BY_STATUS_RE_CONFIRM_INPUT_CARD_INFORMATION',
    number: '3-3',
    name: 'Re-confirm from input card'
  }, {
    link: '/4',
    permission: 'GET_APPLICATION_BY_STATUS_PAID_CHECKED',
    number: '4',
    name: 'Paid checked'
  }]
}
// {
//   link: '/card-warehouse-management',
//   name: 'Card warehouse management'
// }, {
//   link: '/excel-output',
//   name: 'Excel output'
// }, {
//   link: '/register-the-application',
//   name: 'Register the application'
// }, {
//   link: '/passport-image-output',
//   name: 'Passport image output'
// }
]

@withRouter
@withLocalize
@connect(state => ({
  accountStore: state.account,
  uiStore: state.ui
}))

class SideBar extends Component {
  _onMenuItemSelect = (e) => {
    this.props.history.push(e.key)
  }

  _renderMenuItems = (item) => {
    const { accountStore: { permissions } } = this.props

    if (item.permission && !permissions.includes(item.permission)) return null

    if (item.subItems) {
      return (
        <Menu.SubMenu
          key={item.link}
          title={item.name}
        >
          {item.subItems.map(subItem => (subItem.permission && permissions.includes(subItem.permission) ? (
            <Menu.Item key={`${item.link}${subItem.link}`}>
              <div className="custom">
                <span>{subItem.number}</span>
                <p>{subItem.name}</p>
              </div>
            </Menu.Item>
          ) : null))}
        </Menu.SubMenu>
      )
    }

    return (
      <Menu.Item key={item.link}>
        <span>{item.name}</span>
      </Menu.Item>
    )
  }

  render() {
    const { uiStore } = this.props

    return (
      <Box className={uiStore.isSideBarOpen ? 'open' : ''}>
        <div className="surfing-box">
          <div className="top">
            <img
              src={Images.LOGO}
              alt=""
              className="logo"
            />
          </div>
          <Menu
            onClick={this._onMenuItemSelect}
            defaultSelectedKeys={[this.props.location.pathname]}
            defaultOpenKeys={['/application-situation']}
            mode="inline"
          >
            {MENU_ITEMS.map(this._renderMenuItems)}
          </Menu>
        </div>
      </Box>
    )
  }
}

export default SideBar
