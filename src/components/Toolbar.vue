<template>
  <v-toolbar color="primary" app>
    <router-link class="toolbar-title" to="/">
      <v-toolbar-title>
        Pressurizer
      </v-toolbar-title>
    </router-link>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <template v-if="!isLogged">
        <v-btn flat :href="loginUrl">{{ $t('toolbar.login') }}
          <v-icon right>mdi-steam-box</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn flat @click="fetchGames" :disabled="isUpdating">{{ $t('toolbar.update') }}
          <v-icon right>mdi-reload</v-icon>
        </v-btn>
        <v-btn flat to="/account">{{ $t('toolbar.account') }}
          <v-icon right>mdi-account</v-icon>
        </v-btn>
        <v-btn flat @click="logout">{{ $t('toolbar.logout') }}
          <v-icon right>mdi-logout-variant</v-icon>
        </v-btn>
      </template>
      <lang-selector />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { config } from '@/config'
  import LangSelector from '@/components/LangSelector.vue'
  import { EventBus } from '@/event-bus'
  import { SnackbarMessage } from '@/models/SnackbarMessage'

  @Component({
    components: {
      LangSelector,
    },
  })
  export default class Toolbar extends Vue {
    isUpdating = false

    get loginUrl() {
      return `${config.apiUrl}/login`
    }

    get isLogged() {
      return this.$store.getters.token
    }

    async logout() {
      await this.$store.dispatch('token', '')
    }

    fetchGames() {
      this.isUpdating = true
      this.$http.post('/fetchGames')
        .then(async (res) => {
          this.isUpdating = true

          if ('hours' in res.data) {
            const h = this.$tc('hours', res.data.hours, { h: res.data.hours })
            const m = this.$tc('minutes', res.data.minutes, { m: res.data.minutes })

            const data: SnackbarMessage = {
              message: this.$t('errors.waitHours', [h, m]) as string,
              color: 'error',
            }

            EventBus.$emit('show-snackbar', data as SnackbarMessage)
          } else {
            const n = this.$tc('gamesNew', res.data.new, { n: res.data.new })
            const u = this.$tc('gamesUpdated', res.data.updated, { u: res.data.updated })

            const data: SnackbarMessage = {
              message: this.$t('table.gameListUpdated', [n, u]) as string,
              color: 'success',
            }

            const v = this.$store.getters.gameList
            await this.$store.dispatch('gameList', v + 1)

            EventBus.$emit('show-snackbar', data as SnackbarMessage)
          }

          this.isUpdating = false
        })
    }
  }
</script>

<style scoped lang="stylus">
  .toolbar-title
    color: inherit
    text-decoration: inherit
</style>
