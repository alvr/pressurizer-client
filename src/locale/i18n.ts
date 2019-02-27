import Vue from 'vue'
import VueI18n from 'vue-i18n'

import es from '@/locale/es'
import en from '@/locale/en'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
  },
})
