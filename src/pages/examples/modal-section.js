import { Component } from 'react'

import Button from '@/components/button'
import ExampleModal from './example-modal'

class ModalSection extends Component {
  render() {
    return (
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
    )
  }
}

export default ModalSection
