import Vue from 'vue'
import '@/main.styl'
import colors from 'vuetify/lib/util/colors'
import Vuetify, {
  VAlert,
  VApp,
  VBtn,
  VCard,
  VCardText,
  VCardTitle,
  VCheckbox,
  VCombobox,
  VContainer,
  VContent,
  VDataTable,
  VEditDialog,
  VFlex,
  VFooter,
  VIcon,
  VImg,
  VLayout,
  VList,
  VListTile,
  VListTileTitle,
  VMenu,
  VParallax,
  VProgressLinear,
  VSnackbar,
  VSpacer,
  VSubheader,
  VTextField,
  VToolbar,
  VToolbarItems,
  VToolbarTitle,
} from 'vuetify/lib'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  components: {
    VAlert,
    VApp,
    VBtn,
    VCard,
    VCardText,
    VCardTitle,
    VCheckbox,
    VCombobox,
    VContainer,
    VContent,
    VDataTable,
    VEditDialog,
    VFlex,
    VFooter,
    VIcon,
    VImg,
    VLayout,
    VList,
    VListTile,
    VListTileTitle,
    VMenu,
    VParallax,
    VProgressLinear,
    VSnackbar,
    VSpacer,
    VSubheader,
    VTextField,
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
    success: colors.lightGreen.darken3,
  },
})
