<template>
  <v-app dark>
    <toolbar />
    <v-content>
      <router-view />
    </v-content>
    <custom-footer />
    <snackbar />
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CustomFooter from '@/components/CustomFooter.vue'
  import Toolbar from '@/components/Toolbar.vue'
  import { i18n } from '@/locale/i18n'
  import Snackbar from '@/components/Snackbar.vue'

  @Component({
    components: {
      Snackbar,
      CustomFooter,
      Toolbar,
    },
  })
  export default class App extends Vue {
    async created() {
      i18n.locale = this.$store.getters.language
      await this.saveToken()
      await this.verifyToken()
    }

    private async saveToken() {
      if (location.hash) {
        const token = location.hash.split('#token=').pop()
        if (token) {
          await this.$store.dispatch('token', token)
          history.replaceState({}, document.title, '.')
        }
      }
    }

    private async verifyToken() {
      if (this.$store.getters.token) {
        const data = { token: this.$store.getters.token }
        this.$http.post('/token', data).catch(
          async () => {
            await this.$store.dispatch('token', '')
          },
        )
      }
    }
  }
</script>

<style lang="stylus">
  html
    overflow-y auto !important
</style>
