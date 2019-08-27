import React, { Component } from 'react'
import { Table } from 'antd'
import styled from 'styled-components'

const StyledTable = styled(Table)`
  .ant-spin {
    .ant-spin-dot {
      display: block;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 5px solid rgba(0, 83, 152, 1);
      border-left-color: rgba(0, 83, 152, 0.4);
      border-right-color: rgba(0, 83, 152, 0.4);
      animation: rotation 1s infinite linear;

      .ant-spin-dot-item {
        display: none;
      }
    }
  }

  .ant-table {
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 8px 35px 0 rgba(0, 0, 0, 0.04);

    .ant-table-content {
      .ant-table-scroll {
        .ant-table-header {
          .ant-table-fixed {
            .ant-table-thead {
              tr {
                th {
                  background-color: white;
                  padding: 0 16px;
                  height: 60px;
                  border-right: 1px solid #e6e6e6;
                  font-size: 16px;
                  font-weight: 600;
                  letter-spacing: 0.34px;

                  &:last-child {
                    border-right: none;
                  }
                }
              }
            }
          }
        }
        .ant-table-body {
          border-top: 1px solid #e6e6e6;
          .ant-table-fixed {
            .ant-table-thead {
              tr {
                th {
                  background-color: white;
                  padding: 0 16px;
                  height: 60px;
                  border-bottom: 2px solid #e6e6e6;
                  border-right: 1px solid #e6e6e6;
                  font-size: 16px;
                  font-weight: 600;
                  letter-spacing: 0.34px;

                  &:last-child {
                    border-right: none;
                  }

                  .ant-table-header-column {
                    .ant-table-column-title {
                      .ant-table-selection {
                        .ant-checkbox-wrapper {
                          .ant-checkbox {
                            .ant-checkbox-inner {
                              width: 20px;
                              height: 20px;

                              &::after {
                                top: 44%;
                                width: 6.714286px;
                                height: 12.142857px;
                              }
                            }

                            &.ant-checkbox-checked {
                              .ant-checkbox-inner {
                                background-color: #f47629;
                                border-color: #f47629;
                              }
                            }

                            .ant-checkbox-input:focus + .ant-checkbox-inner,
                            .ant-checkbox-wrapper:hover .ant-checkbox-inner,
                            .ant-checkbox:hover .ant-checkbox-inner {
                              border-color: #f47629;
                            }

                            &.ant-checkbox-indeterminate .ant-checkbox-inner:after {
                              background-color: #f47629;
                              width: 10px;
                              height: 10px;
                              top: 50%;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            .ant-table-tbody {
              .ant-table-row {
                td {
                  padding: 0 16px;
                  height: 60px;
                  border-bottom: 1px solid #e6e6e6;
                  border-right: 1px solid #e6e6e6;
                  font-size: 15px;
                  color: #535353;

                  max-width: 0;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                  &:last-child {
                    border-right: none;
                  }

                  .ant-checkbox-wrapper {
                    .ant-checkbox {
                      .ant-checkbox-inner {
                        width: 20px;
                        height: 20px;

                        &::after {
                          top: 44%;
                          width: 6.714286px;
                          height: 12.142857px;
                        }
                      }

                      &.ant-checkbox-checked {
                        .ant-checkbox-inner {
                          background-color: #f47629;
                          border-color: #f47629;
                        }
                      }

                      .ant-checkbox-input:focus + .ant-checkbox-inner,
                      .ant-checkbox-wrapper:hover .ant-checkbox-inner,
                      .ant-checkbox:hover .ant-checkbox-inner {
                        border-color: #f47629;
                      }

                      &.ant-checkbox-indeterminate .ant-checkbox-inner:after {
                        background-color: #f47629;
                        width: 10px;
                        height: 10px;
                        top: 50%;
                      }
                    }
                  }
                }

                &:last-child {
                  td {
                    border-bottom: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default class extends Component {
  render() {
    return (
      <StyledTable {...this.props} pagination={false} />
    )
  }
}
