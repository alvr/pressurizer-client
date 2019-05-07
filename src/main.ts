import Vue from 'vue'

import App from '@/App.vue'
import { http } from '@/http-client'
import { i18n } from '@/locale/i18n'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import '@/vuetify'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false

Vue.use(VueSweetalert2)

router.beforeEach((to, from, next) => {
  const publicPages = ['/']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = store.getters.token

  if (authRequired) {
    if (!loggedIn) {
      return next('/')
    } else {
      const data = { token: loggedIn }
      http.post('/token', data).catch(
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
