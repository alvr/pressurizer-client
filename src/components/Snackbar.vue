<template>
  <v-snackbar v-model="snack" :color="snackColor">
    {{ snackText }}
    <v-btn flat @click.native="snack = false">{{ $t('close') }}</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { EventBus } from '@/event-bus'
  import { SnackbarMessage } from '@/models/SnackbarMessage'

  @Component
  export default class Snackbar extends Vue {
    snack = false
    snackColor = ''
    snackText = ''

    created() {
      EventBus.$on('show-snackbar', (data: SnackbarMessage) => {
        this.snack = true
        this.snackText = data.message
        this.snackColor = data.color
      })
    }
  }
</script>
