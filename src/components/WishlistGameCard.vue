<template>
  <v-card class="elevation-5" flat>
    <v-img
      :src="`https://steamcdn-a.akamaihd.net/steam/apps/${wishlist.appId}/header.jpg`"
      height="215px"/>

    <v-card-title primary-title class="headline">{{wishlist.name}}</v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-slide-y-transition>
      <v-list v-show="show">
        <v-list-tile v-if="wishlist.shops.length === 0">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('wishlist.notYet') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else v-for="(shop, index) in wishlist.shops" :key="wishlist.appId + '_' + index" :href="shop.url"
                     target="_blank">
          <v-list-tile-content>
            <v-list-tile-title>{{shop.name}}</v-list-tile-title>
            <v-list-tile-sub-title
              v-html="generateSubtitle(shop.price_new, shop.price_old, shop.price_discount)"/>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-slide-y-transition>
  </v-card>
</template>

<script lang="ts">
  import * as LocaleCurrency from 'locale-currency'
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { UserWishlist } from '@/models/UserWishlist'

  @Component
  export default class WishlistGameCard extends Vue {
    @Prop(Object) readonly wishlist!: UserWishlist

    show = false

    private generateSubtitle(current: number, original: number, discount: number) {
      if (discount === 0) {
        return this.toCurrency(current)
      } else {
        return `<del>${this.toCurrency(original)}</del> ${this.toCurrency(current)} (-${discount}%)`
      }
    }

    private toCurrency(cost: number): string {
      return cost.toLocaleString(this.userCountry, {
        style: 'currency',
        currency: LocaleCurrency.getCurrency(this.userCountry),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }

    private get userCountry() {
      return this.$store.getters.country
    }
  }
</script>
