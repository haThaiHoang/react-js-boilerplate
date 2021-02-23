import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import lodash from 'lodash'

import common from './common.json'
import home from './home.json'

const resources = lodash.merge(
  common,
  home
)

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
