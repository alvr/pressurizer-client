<template>
  <nav>
    <v-toolbar color="primary" class="hidden-sm-and-down" app>
      <router-link class="toolbar-title" to="/">
        <v-toolbar-title>
          Pressurizer
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <v-toolbar-items>
        <template v-if="!isLogged">
          <v-btn flat :href="loginUrl">{{ $t('toolbar.login') }}
            <v-icon right>mdi-steam-box</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn flat @click="fetchGames" :disabled="isUpdating">{{ $t('toolbar.update') }}
            <v-icon right>mdi-reload</v-icon>
          </v-btn>
          <v-btn flat to="/wishlist">{{ $t('toolbar.wishlist') }}
            <v-icon right>mdi-cash-multiple</v-icon>
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

    <div class="hidden-md-and-up">
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">
            <router-link class="nav-item nav-item-title" to="/">
                Pressurizer
            </router-link>
          </div>
          <template v-if="!isLogged">
            <v-card :href="loginUrl">
              <v-card-text>{{ $t('toolbar.login') }}</v-card-text>
            </v-card>
          </template>
          <template v-else>
            <v-card @click="fetchGames" :disabled="isUpdating">
              <v-card-text>{{ $t('toolbar.update') }}</v-card-text>
            </v-card>
            <v-card to="/wishlist">
              <v-card-text>{{ $t('toolbar.wishlist') }}</v-card-text>
            </v-card>
            <v-card to="/account">
              <v-card-text>{{ $t('toolbar.account') }}</v-card-text>
            </v-card>
            <v-card @click="logout">
              <v-card-text>{{ $t('toolbar.logout') }}</v-card-text>
            </v-card>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
  </nav>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import LangSelector from '@/components/LangSelector.vue'
  import { config } from '@/config'
  import { EventBus } from '@/event-bus'
  import { http } from '@/http-client'
  import { SnackbarMessage } from '@/models/SnackbarMessage'
  import router from '@/router'

  @Component({
    components: {
      LangSelector,
    },
  })
  export default class Toolbar extends Vue {
    isUpdating = false

    private get loginUrl() {
      return `${config.apiUrl}/login`
    }

    private get isLogged() {
      return this.$store.getters.token
    }

    private async logout() {
      await this.$store.dispatch('gameList', 0)
      await this.$store.dispatch('token', '')
      router.push('home')
    }

    private fetchGames() {
      this.isUpdating = true
      http.post('/games')
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
  .toolbar-title, .nav-item-title
    color: inherit
    text-decoration: inherit
</style>
