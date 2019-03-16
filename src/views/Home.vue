<template>
  <main>
      <landing v-if="!isLogged" />
      <game-list :key="gameListVersion" v-else />
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import GameList from '@/components/GameList.vue'
  import Landing from '@/components/Landing.vue'

  @Component({
    components: {
      GameList,
      Landing,
    },
  })
  export default class Home extends Vue {
    get isLogged() {
      return this.$store.getters.token
    }

    get gameListVersion() {
      return this.$store.getters.gameList
    }
  }
</script>
