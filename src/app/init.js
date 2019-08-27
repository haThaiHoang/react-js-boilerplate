import { Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { withLocalize } from 'react-localize-redux'
import setLocale from 'yup/lib/setLocale'

import errorMessagesEN from '@/languages/error-messages/en.json'
import errorMessagesJP from '@/languages/error-messages/jp.json'
import validationEN from '@/languages/validation/en.json'
import validationJP from '@/languages/validation/jp.json'

setLocale({
  mixed: {
    required: 'required'
  },
  string: {
    email: 'email'
  }
})

@withLocalize

class Init extends Component {
  constructor(props) {
    super(props)
    const { initialize, addTranslationForLanguage: add } = props

    initialize({
      languages: [{
        name: 'English',
        code: 'en'
      }, {
        name: 'Japan',
        code: 'jp'
      }],
      options: {
        renderToStaticMarkup
      }
    })

    add(errorMessagesEN, 'en')
    add(errorMessagesJP, 'jp')
    add(validationEN, 'en')
    add(validationJP, 'jp')
  }

  componentDidMount() {
    this._hidePreloading()
  }

  _hidePreloading() {
    const preloading = document.getElementsByClassName('preloading')[0]

    const fadeEffect = setInterval(() => {
      if (!preloading.style.opacity) {
        preloading.style.opacity = 1
      }
      if (preloading.style.opacity === '1') {
        preloading.style.opacity = 0
      } else {
        clearInterval(fadeEffect)
        preloading.style.display = 'none'
      }
    }, 500)
  }

  render() {
    return null
  }
}

export default Init
