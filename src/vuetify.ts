import Vue from 'vue'

import 'vuetify/src/stylus/app.styl'
import Vuetify, {
  VApp,
  VBtn,
  VContent,
  VIcon,
  VList,
  VListTile,
  VListTileTitle,
  VMenu,
  VSpacer,
  VToolbar,
  VToolbarItems,
  VToolbarTitle,
} from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  components: {
    VApp,
    VBtn,
    VContent,
    VIcon,
    VList,
    VListTile,
    VListTileTitle,
    VMenu,
    VSpacer,
    VToolbar,
    VToolbarItems,
    VToolbarTitle,
  },
  theme: {
    primary: colors.deepPurple.base,
    secondary: colors.pink.base,
    accent: colors.purple.base,
    error: colors.red.base,
    warning: colors.amber.base,
    info: colors.cyan.base,
    success: colors.lightGreen.base,
  },
})
