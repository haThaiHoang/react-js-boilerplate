import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonTranslation from './common-translation.json'

i18n.use(initReactI18next).init({
  resources: commonTranslation,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
