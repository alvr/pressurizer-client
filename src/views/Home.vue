<template>
  <main>
    <landing v-if="!isLogged" />
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Landing from '@/components/Landing.vue'
  @Component({
    components: {
      Landing,
    },
  })
  export default class Home extends Vue {
    get isLogged() {
      return this.$store.getters.token
    }
  }
</script>
