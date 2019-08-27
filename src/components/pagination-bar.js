import React, { Component } from 'react'
import { Pagination } from 'antd'
import styled from 'styled-components'

import Select from './select'

const Box = styled.div`
  display: flex;
  align-items: center;

  .ant-pagination {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    border-radius: 3px;
    overflow: hidden;
    margin-right: 20px;

    .ant-pagination-jump-next,
    .ant-pagination-jump-prev,
    .ant-pagination-next,
    .ant-pagination-prev,
    .ant-pagination-item,
    .ant-pagination-total-text {
      width: 38px;
      height: 38px;
      border: none;
      border-radius: 0;
      line-height: 38px;
      font-size: 15px;
      font-weight: 500;
      margin-right: 0;
      border-right: 1px solid #efefef;

      &:hover {
        opacity: 0.8;

        a {
          color: #737373;
        }
      }

      &.ant-pagination-item-active {
        background-color: #005398;

        a {
          color: white;
        }
      }

      .ant-pagination-item-link {
        border: none;
        border-radius: 0;

        .anticon {
          vertical-align: middle;
        }
      }
    }
  }
`

const options = [{
  value: 100,
  name: '100'
}, {
  value: 200,
  name: '200'
}, {
  value: 300,
  name: '300'
}]

export default ({ onChange, ...props }) => (
  <Box>
    <Pagination
      {...props}
      onChange={value => onChange('page', value)}
    />
    <Select
      size="small"
      style={{ width: 105 }}
      options={options}
      modern
      value={props.pageSize}
      onChange={e => onChange('size', e.target.value)}
    />
  </Box>
)
