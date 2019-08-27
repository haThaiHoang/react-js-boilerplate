import { Tooltip } from 'antd'
import React, { Fragment } from 'react'
import lodash from 'lodash'

const deepValue = (obj, path) => {
  const pathArray = path.split('.')
  for (let i = 0; i < pathArray.length; i += 1) {
    if (!lodash.isEmpty(obj)) {
      obj = obj[pathArray[i]]
    }
  }
  return obj
}

export default function Column({ data = [], align = 'center', width, key, ...props }) {
  return ({
    key,
    dataIndex: key,
    align,
    width,
    title: data.map(item => (
      <Fragment key={item.title}>{item.title}<br /></Fragment>
    )),
    render: (cell, record) => data.map((item) => {
      let title = deepValue(record, item.value)
      if (typeof item.process === 'function') {
        title = item.process(title)
      }
      return (
        <Fragment key={item.title}>
          <Tooltip placement="topLeft" title={title}>
            {title}
          </Tooltip>
          <br />
        </Fragment>
      )
    }),
    ...props
  })
}
