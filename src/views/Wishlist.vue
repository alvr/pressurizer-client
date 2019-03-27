<template>
  <v-layout class="my-5" column wrap align-center>
      <v-container grid-list-xl fluid>
        <v-layout justify-space-around row v-for="i in Math.ceil(wishlist.length / 3)" :key="i">
          <v-flex xs12 md4 grow v-for="game in wishlist.slice((i - 1) * 3, i * 3)" :key="game.appId">
            <wishlist-game-card :wishlist="game"/>
          </v-flex>
        </v-layout>
      </v-container>
    <v-btn
      color="primary"
      fab
      fixed
      big
      bottom
      right
      @click="updateWishlist"
    >
      <v-icon>mdi-reload</v-icon>
    </v-btn>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { http } from '@/http-client'
  import { UserWishlist } from '@/models/UserWishlist'
  import WishlistGameCard from '@/components/WishlistGameCard.vue'
  import { SnackbarMessage } from '@/models/SnackbarMessage'
  import { EventBus } from '@/event-bus'

  @Component({
    components: {
      WishlistGameCard,
    },
  })
  export default class Wishlist extends Vue {

    wishlist: UserWishlist[] = []
    savingError = false

    mounted() {
      http.get('/wishlist')
        .then((res) => {
          this.wishlist = res.data
        })
    }

    updateWishlist() {
      http.post('/wishlist')
        .catch(() => this.savingError = true)
        .finally(() => EventBus.$emit('show-snackbar', this.savingData()))
    }

    savingData(): SnackbarMessage {
      if (this.savingError) {
        return {
          message: this.$t('wishlist.updateError') as string,
          color: 'error',
        } as SnackbarMessage
      } else {
        return {
          message: this.$t('wishlist.updated') as string,
          color: 'success',
        } as SnackbarMessage
      }
    }

  }
</script>
