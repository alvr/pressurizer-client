<template>
  <div>
    <section>
      <v-parallax :src="require('../assets/parallax.webp')" height="500" alt="Parallax background">
        <v-layout class="white--text" column align-center justify-center>
          <img src="../assets/logo_big.svg" alt="Pressurizer logo" height="256">
          <h1 class="white--text mb-2 display-1 text-xs-center">Pressurizer</h1>
          <div class="subheading mb-3 text-xs-center">{{ $t('landing.subtitle') }}</div>
        </v-layout>
      </v-parallax>
    </section>
    <section>
      <v-layout class="my-5" column wrap align-center>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-5" min-height="250" flat>
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-wallet</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">{{ $t('landing.wallet.title') }}</div>
                  </v-card-title>
                  <v-card-text>{{ $t('landing.wallet.desc') }}</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-5" min-height="250" flat>
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-chart-donut</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">{{ $t('landing.stats.title') }}</div>
                  </v-card-title>
                  <v-card-text>{{ $t('landing.stats.desc') }}</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-5" min-height="250" flat>
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-flash</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">{{ $t('landing.fast.title') }}</div>
                  </v-card-title>
                  <v-card-text>{{ $t('landing.fast.desc') }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Landing extends Vue {
  }
</script>
