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
import { EventBus } from '@/event-bus'

Vue.config.productionTip = false

Vue.use(VueAxios, axios.create({
  baseURL: config.apiUrl,
  timeout: 0,
  headers: {
    Authorization: `Bearer ${store.getters.token}`,
  },
}))

router.beforeEach((to, from, next) => {
  const publicPages = ['/']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = store.getters.token

  if (authRequired) {
    if (!loggedIn) {
      return next('/')
    } else {
      const data = { token: loggedIn }
      EventBus.$http.post('/token', data).catch(
        async () => {
          await store.dispatch('token', '')
          return next('/')
        },
      )
    }
  }

  next()
})

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
