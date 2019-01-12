import Vue from 'vue'

import 'vuetify/src/stylus/app.styl'
import Vuetify, {
  VApp,
  VContent,
  VToolbar,
  VToolbarTitle,
} from 'vuetify/lib'

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VApp,
    VContent,
    VToolbar,
    VToolbarTitle,
  },
})
