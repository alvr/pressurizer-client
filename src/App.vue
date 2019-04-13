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
  import Snackbar from '@/components/Snackbar.vue'
  import Toolbar from '@/components/Toolbar.vue'
  import { http } from '@/http-client'
  import { i18n } from '@/locale/i18n'

  @Component({
    components: {
      CustomFooter,
      Snackbar,
      Toolbar,
    },
  })
  export default class App extends Vue {
    async created() {
      i18n.locale = this.$store.getters.language
      await this.saveToken()
      await this.verifyToken()

      http.get('/account')
        .then(async (res) => {
          const country = res.data.country.code
          await this.$store.dispatch('country', country)
        })
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
        http.post('/token', data).catch(
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
