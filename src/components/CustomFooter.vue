<template>
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>&copy; {{ currentYear }} &mdash; Pressurizer by <a class="link" href="https://alvr.me">Álvaro S.</a></div>
  </v-footer>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class CustomFooter extends Vue {
    get currentYear() {
      return new Date().getFullYear()
    }
  }
</script>

<style scoped lang="stylus">
  .link
    color inherit
    font-weight bold
    text-decoration none
</style>

