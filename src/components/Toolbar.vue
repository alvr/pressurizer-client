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
          <v-icon right>mdi-login-variant</v-icon>
        </v-btn>
      </template>
      <template v-else>
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

  @Component({
    components: {
      LangSelector,
    },
  })
  export default class Toolbar extends Vue {
    get loginUrl() {
      return `${config.apiUrl}/login`
    }

    get isLogged() {
      return this.$store.getters.token
    }

    async logout() {
      await this.$store.dispatch('token', '')
    }
  }
</script>

<style scoped lang="stylus">
  .toolbar-title
    color: inherit
    text-decoration: inherit
</style>
