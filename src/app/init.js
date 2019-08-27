import { Component } from 'react'
import { connect } from 'react-redux'
import { renderToStaticMarkup } from 'react-dom/server'
import { withLocalize } from 'react-localize-redux'
import * as Yup from 'yup'

import Storage from 'app/utils/storage'
import errorMessagesEN from 'app/languages/error-messages/en.json'
import errorMessagesJP from 'app/languages/error-messages/jp.json'
import validationEN from 'app/languages/validation/en.json'
import validationJP from 'app/languages/validation/jp.json'
import { actions } from 'app/store/actions'

Yup.setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

@withLocalize
@connect(null, {
  getAccountInfo: actions.getAccountInfo
})

class Init extends Component {
  constructor(props) {
    super(props)

    this.props.initialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'Japan', code: 'jp' }
      ],
      options: { renderToStaticMarkup }
    })

    props.addTranslationForLanguage(errorMessagesEN, 'en')
    props.addTranslationForLanguage(errorMessagesJP, 'jp')
    props.addTranslationForLanguage(validationEN, 'en')
    props.addTranslationForLanguage(validationJP, 'jp')
  }

  componentDidMount() {
    if (Storage.has('ACCESS_TOKEN')) {
      this.props.getAccountInfo()
    }
  }

  render() {
    return null
  }
}

export default Init
