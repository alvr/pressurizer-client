<template>
  <v-toolbar color="primary" app>
    <v-toolbar-title>Pressurizer</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :href="loginUrl">Login</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { config } from '@/config'

  @Component
  export default class Toolbar extends Vue {
    get loginUrl() {
      return `${config.apiUrl}/login`
    }
  }
</script>
