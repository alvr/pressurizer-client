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
  import Toolbar from './components/Toolbar.vue'

  @Component({
    components: {
      Toolbar,
    },
  })
  export default class App extends Vue {}
</script>
