import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'

import Page from '@/components/page'
import Container from '@/components/container'
import Thumbnail from '@/components/thumbnail'
import FetchableTable from '@/components/fetchable-table'
import Button from '@/components/button'
import { TYPES } from '@/store/products'
import ExampleModal from './example-modal'

const Content = styled.div`
  padding: 30px 0;

  section {
    margin-bottom: 40px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .section-title {
      font-size: 25px;
      margin-bottom: 10px;
    }
    
    .section-body {
      padding: 20px;
      border-radius: 5px;
      background-color: white;
    }
  }
`

@inject((stores) => ({
  productsStore: stores.products
}))
@observer
class Examples extends Component {
  static propTypes = {
    productsStore: PropTypes.object
  }

  constructor(props) {
    super(props)

    this._columns = [{
      title: '#',
      width: 50,
      dataIndex: 'id',
      sortable: true,
      key: 'id'
    }, {
      title: 'Image',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 100,
      render: (cell) => (
        <Thumbnail
          url={cell}
          rounded
        />
      )
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sortable: true,
      width: 220
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 220
    }]
  }

  render() {
    const { productsStore } = this.props

    return (
      <Page>
        <Container>
          <Content>
            <section>
              <p className="section-title">
                Fetchable Table
              </p>
              <div className="section-body">
                <FetchableTable
                  rowKey="id"
                  columns={this._columns}
                  action={productsStore.getProducts}
                  total={productsStore.products.total}
                  page={productsStore.products.page}
                  items={productsStore.products.items}
                  loading={productsStore.type === TYPES.GET_PRODUCTS}
                  sort={productsStore.products.sort}
                />
              </div>
            </section>

            <section>
              <p className="section-title">
                Modal
              </p>
              <div className="section-body">
                <Button
                  type="primary"
                  onClick={() => this._exampleModal.open()}
                >
                  Open Modal
                </Button>
                <ExampleModal
                  innerRef={(ref) => { this._exampleModal = ref }}
                />
              </div>
            </section>
          </Content>
        </Container>
      </Page>
    )
  }
}

export default Examples
