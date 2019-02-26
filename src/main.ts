import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
import '@/vuetify'
import { i18n } from '@/locale/i18n'
import { config } from '@/config'

Vue.config.productionTip = false

Vue.use(VueAxios, axios.create({
  baseURL: config.apiUrl,
  timeout: 0,
}))

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
