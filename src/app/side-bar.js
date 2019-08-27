import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withLocalize } from 'react-localize-redux'

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
    }
  }
`

const MENU_ITEMS = [{
  link: '/',
  name: 'Home'
}]

@withRouter
@withLocalize
@connect((state) => ({
  accountStore: state.account,
  uiStore: state.ui
}))

class SideBar extends Component {
  _onMenuItemSelect = (e) => {
    this.props.history.push(e.key)
  }

  render() {
    const { uiStore } = this.props

    return (
      <Box className={uiStore.isSideBarOpen ? 'open' : ''}>
        {/* <div className="surfing-box">
          <Menu
            onClick={this._onMenuItemSelect}
            defaultSelectedKeys={[this.props.location.pathname]}
            mode="inline"
          >
            {MENU_ITEMS.map(this._renderMenuItems)}
          </Menu>
        </div> */}
      </Box>
    )
  }
}

export default SideBar
