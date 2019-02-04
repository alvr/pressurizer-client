<template>
  <v-app dark>
    <toolbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Toolbar from '@/components/Toolbar.vue'
  import { i18n } from '@/locale/i18n'

  @Component({
    components: {
      Toolbar,
    },
  })
  export default class App extends Vue {
    created() {
      i18n.locale = this.$store.getters.language
    }
  }
</script>

<style lang="stylus">
  html
    overflow-y auto !important
</style>
