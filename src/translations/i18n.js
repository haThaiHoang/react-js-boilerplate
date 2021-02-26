import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import lodash from 'lodash'

import Storage from '@/utils/storage'
import common from './common.json'
import home from './home.json'

const resources = lodash.merge(
  common,
  home
)

i18n.use(initReactI18next).init({
  resources,
  lng: Storage.get('LANGUAGE') || 'en',
  fallbackLng: Storage.get('LANGUAGE') || 'en',
  interpolation: {
    escapeValue: false
  }
})

i18n.off('languageChanged')
i18n.on('languageChanged', (language) => {
  Storage.set('LANGUAGE', language)
})

export default i18n
